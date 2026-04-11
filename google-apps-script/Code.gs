const ALLOWED_ORIGIN = 'https://philippine-roadwatch.github.io';
const TRACKING_HEADER_ALIASES = [
  'tracking',
  'trackingnumber',
  'tracking number',
  'tracking #',
  'tracking no',
  'tracking_no',
  'reference number',
  'referencenumber'
];
const STATUS_HEADER_ALIASES = ['status', 'report status', 'reportstatus', 'report_status'];
const DEFAULT_REPORT_HEADERS = [
  'timestamp',
  'tracking',
  'lastname',
  'firstname',
  'mi',
  'email',
  'phone',
  'reporterProvince',
  'reporterCity',
  'reporterBarangay',
  'reporterStreetAddress',
  'location',
  'issue',
  'issueCategory',
  'issueType',
  'issueTypeOption',
  'region',
  'province',
  'city',
  'barangay',
  'roadName',
  'nearestLandmark',
  'lat',
  'lng',
  'photo',
  'status'
];

function doGet(e) {
  const params = extractRequestParams_(e);
  const action = params.action || '';

  if (action === 'submit') {
    return handleSubmission_(params, e);
  }

  if (action !== 'getReports' && hasSubmissionPayload_(params)) {
    return handleSubmission_(params, e);
  }

  if (action === 'getReports' || action === '') {
    const reports = readReports_();
    return buildJsonResponse_({ reports: reports, allowedOrigin: ALLOWED_ORIGIN }, e);
  }

  if (action === 'getReportByTracking') {
    const tracking = params.tracking || '';
    const report = readReportByTracking_(tracking);
    return buildJsonResponse_({ report: report, allowedOrigin: ALLOWED_ORIGIN }, e);
  }

  if (action === 'updateStatus') {
    const tracking = params.tracking || '';
    const status = params.status || '';
    const result = updateReportStatusByTracking_(tracking, status);

    return buildJsonResponse_({
      success: result.success,
      tracking: tracking,
      status: result.status,
      updated: result.updated,
      error: result.error || '',
      allowedOrigin: ALLOWED_ORIGIN
    }, e);
  }

  if (action === 'deleteReport') {
    const tracking = params.tracking || '';
    const result = deleteReportByTracking_(tracking);

    return buildJsonResponse_({
      success: result.success,
      tracking: tracking,
      deleted: result.deleted,
      error: result.error || '',
      allowedOrigin: ALLOWED_ORIGIN
    }, e);
  }

  return buildJsonResponse_({ error: 'Unknown action.', allowedOrigin: ALLOWED_ORIGIN }, e);
}

function doPost(e) {
  const params = extractRequestParams_(e);

  if (params.action === 'updateStatus') {
    const tracking = params.tracking || '';
    const status = params.status || '';
    const result = updateReportStatusByTracking_(tracking, status);

    return buildJsonResponse_({
      success: result.success,
      tracking: tracking,
      status: result.status,
      updated: result.updated,
      error: result.error || '',
      allowedOrigin: ALLOWED_ORIGIN
    }, e);
  }

  if (params.action === 'deleteReport') {
    const tracking = params.tracking || '';
    const result = deleteReportByTracking_(tracking);

    return buildJsonResponse_({
      success: result.success,
      tracking: tracking,
      deleted: result.deleted,
      error: result.error || '',
      allowedOrigin: ALLOWED_ORIGIN
    }, e);
  }

  return handleSubmission_(params, e);
}


function extractRequestParams_(e) {
  const queryParams = (e && e.parameter) || {};
  const postData = (e && e.postData && e.postData.contents) || '';

  if (!postData) {
    return sanitizeParams_(queryParams);
  }

  const parsedBody = parseBodyParams_(postData);
  const merged = Object.assign({}, parsedBody, queryParams);
  return sanitizeParams_(merged);
}

function sanitizeParams_(params) {
  const sanitized = {};
  Object.keys(params || {}).forEach(function (key) {
    const value = params[key];
    if (typeof value === 'string') {
      sanitized[key] = value.trim();
      return;
    }

    if (value === null || value === undefined) {
      sanitized[key] = '';
      return;
    }

    sanitized[key] = String(value).trim();
  });

  return sanitized;
}

function parseBodyParams_(rawBody) {
  const body = String(rawBody || '').trim();
  if (!body) return {};

  try {
    const parsedJson = JSON.parse(body);
    if (parsedJson && typeof parsedJson === 'object') {
      return parsedJson;
    }
  } catch (error) {
    // Ignore JSON parse errors and continue with URL-encoded parsing.
  }

  try {
    return parseUrlEncodedBody_(body);
  } catch (error) {
    return {};
  }
}

function parseUrlEncodedBody_(body) {
  const params = {};
  const pairs = String(body || '').split('&');

  pairs.forEach(function (pair) {
    if (!pair) return;
    const separatorIndex = pair.indexOf('=');
    const rawKey = separatorIndex === -1 ? pair : pair.slice(0, separatorIndex);
    const rawValue = separatorIndex === -1 ? '' : pair.slice(separatorIndex + 1);
    const key = decodeURIComponent(String(rawKey || '').replace(/\+/g, ' '));
    const value = decodeURIComponent(String(rawValue || '').replace(/\+/g, ' '));

    if (!key) return;
    params[key] = value;
  });

  return params;
}

function handleSubmission_(params, e) {
  const row = {
    timestamp: new Date().toISOString(),
    tracking: params.tracking || '',
    lastname: params.lastname || '',
    firstname: params.firstname || '',
    mi: params.mi || '',
    email: normalizeEmail_(params.email || ''),
    phone: params.phone || '',
    reporterProvince: params.reporterProvince || '',
    reporterCity: params.reporterCity || '',
    reporterBarangay: params.reporterBarangay || '',
    reporterStreetAddress: params.reporterStreetAddress || '',
    location: params.location || '',
    issue: params.issue || '',
    issueCategory: params.issueCategory || '',
    issueType: params.issueType || '',
    issueTypeOption: params.issueTypeOption || '',
    region: params.region || '',
    province: params.province || '',
    city: params.city || '',
    barangay: params.barangay || '',
    roadName: params.roadName || '',
    nearestLandmark: params.nearestLandmark || '',
    lat: params.lat || '',
    lng: params.lng || '',
    photo: params.photo || '',
    status: params.status || 'Pending'
  };

  const appendResult = appendReport_(row);
  const emailResult = sendSubmissionReceiptEmail_(row, appendResult);

  return buildJsonResponse_({
    success: true,
    duplicate: appendResult.duplicate,
    tracking: row.tracking,
    emailSent: emailResult.sent,
    emailError: emailResult.error || '',
    allowedOrigin: ALLOWED_ORIGIN
  }, e);
}

function hasSubmissionPayload_(params) {
  if (!params) return false;

  const tracking = String(params.tracking || '').trim();
  const email = String(params.email || '').trim();
  const issue = String(params.issue || '').trim();
  return Boolean(tracking || email || issue);
}

function normalizeEmail_(emailValue) {
  return String(emailValue || '').trim().toLowerCase();
}

function sendSubmissionReceiptEmail_(row, appendResult) {
  const recipientEmail = String((row && row.email) || '').trim();
  if (!recipientEmail) {
    return { sent: false, error: 'No recipient email was provided.' };
  }

  if (appendResult && appendResult.duplicate) {
    return { sent: false, error: 'Skipped sending receipt for duplicate tracking.' };
  }

  const recipientName = buildRecipientName_(row);
  const submittedDate = new Date((row && row.timestamp) || new Date());
  const submissionTime = Utilities.formatDate(submittedDate, 'Asia/Manila', 'MMMM dd, yyyy hh:mm:ss a');
  const trackingNumber = String((row && row.tracking) || '').trim() || 'N/A';

  const subject = 'RoadWATCH PH Report Submission Confirmation';
  const body = [
    'Dear ' + recipientName + ',',
    '',
    'Thank you for using RoadWATCH PH and for taking the time to submit your report. Your effort is greatly appreciated and will be a big help in improving road safety and addressing concerns in the community.',
    '',
    'Please find below the details of your submission:',
    '',
    'Time of Submission: ' + submissionTime,
    '',
    'Reference/Tracking Number: ' + trackingNumber,
    '',
    'Kindly keep this information for your records and future follow-ups. Thank you once again for your support and cooperation.',
    '',
    'Sincerely,',
    'RoadWATCH PH Team'
  ].join('\n');

  try {
    MailApp.sendEmail(recipientEmail, subject, body);
    return { sent: true, error: '' };
  } catch (error) {
    return {
      sent: false,
      error: error && error.message ? String(error.message) : 'Unable to send receipt email.'
    };
  }
}

function buildRecipientName_(row) {
  const firstName = String((row && row.firstname) || '').trim();
  const lastName = String((row && row.lastname) || '').trim();
  const fullName = [firstName, lastName].filter(function (namePart) { return namePart !== ''; }).join(' ');
  return fullName || 'Project Roadwatch';
}

function updateReportStatusByTracking_(tracking, status) {
  const trackingValue = String(tracking || '').trim();
  const normalizedStatus = normalizeStatus_(status);

  if (!trackingValue) {
    return { success: false, updated: false, status: normalizedStatus, error: 'Tracking is required.' };
  }

  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return { success: false, updated: false, status: normalizedStatus, error: 'No reports found.' };
  }

  const headers = values[0].map(function (header) { return String(header || '').trim(); });
  const trackingColumnIndex = findColumnIndexByAliases_(headers, TRACKING_HEADER_ALIASES);
  const statusColumnIndex = findColumnIndexByAliases_(headers, STATUS_HEADER_ALIASES);

  if (trackingColumnIndex === -1 || statusColumnIndex === -1) {
    return {
      success: false,
      updated: false,
      status: normalizedStatus,
      error: 'Missing tracking or status column in sheet.'
    };
  }

  const targetTracking = trackingValue.toLowerCase();
  for (var rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    var rowTracking = String(values[rowIndex][trackingColumnIndex] || '').trim().toLowerCase();
    if (rowTracking === targetTracking) {
      sheet.getRange(rowIndex + 1, statusColumnIndex + 1).setValue(normalizedStatus);
      return { success: true, updated: true, status: normalizedStatus };
    }
  }

  return { success: false, updated: false, status: normalizedStatus, error: 'Tracking number not found.' };
}

function normalizeStatus_(status) {
  const raw = String(status || '').trim().toLowerCase();
  if (raw === 'verified') return 'Verified';
  if (raw === 'in progress' || raw === 'inprogress') return 'In Progress';
  if (raw === 'repaired') return 'Repaired';
  return 'Pending';
}

function deleteReportByTracking_(tracking) {
  const trackingValue = String(tracking || '').trim();
  if (!trackingValue) {
    return { success: false, deleted: false, error: 'Tracking is required.' };
  }

  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return { success: false, deleted: false, error: 'No reports found.' };
  }

  const headers = values[0].map(function (header) { return String(header || '').trim(); });
  const trackingColumnIndex = findColumnIndexByAliases_(headers, TRACKING_HEADER_ALIASES);
  if (trackingColumnIndex === -1) {
    return { success: false, deleted: false, error: 'Missing tracking column in sheet.' };
  }

  const targetTracking = trackingValue.toLowerCase();
  for (var rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    var rowTracking = String(values[rowIndex][trackingColumnIndex] || '').trim().toLowerCase();
    if (rowTracking === targetTracking) {
      sheet.deleteRow(rowIndex + 1);
      return { success: true, deleted: true };
    }
  }

  return { success: false, deleted: false, error: 'Tracking number not found.' };
}

function buildJsonResponse_(payload, e) {
  const safePayload = payload || {};
  const callback = sanitizeCallback_((e && e.parameter && e.parameter.callback) || '');

  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(safePayload) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(JSON.stringify(safePayload))
    .setMimeType(ContentService.MimeType.JSON);
}

function sanitizeCallback_(callback) {
  const trimmed = String(callback || '').trim();
  if (!trimmed) return '';

  const callbackPattern = /^[a-zA-Z_$][0-9a-zA-Z_$\.]*$/;
  return callbackPattern.test(trimmed) ? trimmed : '';
}

function getSheet_() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');
  const sheetName = scriptProperties.getProperty('SHEET_NAME') || 'Reports';
  let ss = null;

  if (spreadsheetId) {
    ss = SpreadsheetApp.openById(spreadsheetId);
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      scriptProperties.setProperty('SPREADSHEET_ID', ss.getId());
    }
  }

  if (!ss) {
    throw new Error('Missing SPREADSHEET_ID script property. Set it in Project Settings > Script properties, or bind this script to a spreadsheet and rerun.');
  }

  const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(DEFAULT_REPORT_HEADERS);
  }

  return sheet;
}

function appendReport_(row) {
  const sheet = getSheet_();
  const headers = ensureSheetHeaders_(sheet, Object.keys(row || {}));
  const columnCount = headers.length;
  const trackingValue = String(row.tracking || '').trim();
  const dataRowCount = Math.max(sheet.getLastRow() - 1, 0);
  const dataValues = dataRowCount > 0
    ? sheet.getRange(2, 1, dataRowCount, columnCount).getValues()
    : [];

  if (trackingValue) {
    const trackingColumnIndex = findColumnIndexByAliases_(headers, TRACKING_HEADER_ALIASES);
    const normalizedTrackingValue = normalizeLookupValue_(trackingValue);

    const existingTrackings = dataValues
      .map(function (rowValues) {
        if (trackingColumnIndex === -1) return '';
        return normalizeLookupValue_(rowValues[trackingColumnIndex]);
      })
      .filter(function (value) { return value !== ''; });

    if (existingTrackings.includes(normalizedTrackingValue)) {
      return { duplicate: true };
    }
  }

  const valuesToWrite = [headers.map(function (header) {
    return row[header] || '';
  })];

  const firstAvailableIndex = dataValues.findIndex(function (rowValues) {
    return rowValues.every(function (value) { return String(value || '').trim() === ''; });
  });

  if (firstAvailableIndex !== -1) {
    sheet.getRange(firstAvailableIndex + 2, 1, 1, columnCount).setValues(valuesToWrite);
  } else {
    sheet.appendRow(valuesToWrite[0]);
  }

  return { duplicate: false };
}

function ensureSheetHeaders_(sheet, incomingHeaders) {
  const headerValues = sheet.getLastRow() > 0
    ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    : [];

  const existingHeaders = headerValues
    .map(function (header) { return String(header || '').trim(); })
    .filter(function (header) { return header !== ''; });

  const resolvedHeaders = existingHeaders.length > 0
    ? existingHeaders.slice()
    : DEFAULT_REPORT_HEADERS.slice();

  const knownHeadersLookup = {};
  resolvedHeaders.forEach(function (header) {
    knownHeadersLookup[header.toLowerCase()] = true;
  });

  (incomingHeaders || []).forEach(function (header) {
    const normalized = String(header || '').trim();
    if (!normalized) return;
    if (knownHeadersLookup[normalized.toLowerCase()]) return;
    resolvedHeaders.push(normalized);
    knownHeadersLookup[normalized.toLowerCase()] = true;
  });

  if (existingHeaders.length === 0) {
    sheet.getRange(1, 1, 1, resolvedHeaders.length).setValues([resolvedHeaders]);
    return resolvedHeaders;
  }

  if (resolvedHeaders.length !== existingHeaders.length) {
    sheet.getRange(1, 1, 1, resolvedHeaders.length).setValues([resolvedHeaders]);
  }

  return resolvedHeaders;
}

function readReports_() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const headers = values[0];
  return values.slice(1)
    .filter(function (row) {
      return row.some(function (value) { return String(value || '').trim() !== ''; });
    })
    .map(function (row) {
      const item = {};
      headers.forEach(function (header, index) {
        item[String(header || '').trim()] = row[index];
      });
      return item;
    });
}

function readReportByTracking_(tracking) {
  const trackingValue = String(tracking || '').trim().toLowerCase();
  if (!trackingValue) return null;

  const reports = readReports_();
  for (var i = 0; i < reports.length; i += 1) {
    var rowTracking = String(getObjectValueByAliases_(reports[i], TRACKING_HEADER_ALIASES) || '').trim().toLowerCase();
    if (rowTracking === trackingValue) {
      return reports[i];
    }
  }

  return null;
}

function normalizeHeader_(header) {
  return String(header || '')
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s?#\s?/g, ' number');
}

function normalizeLookupValue_(value) {
  return String(value || '').trim().toLowerCase();
}

function findColumnIndexByAliases_(headers, aliases) {
  const normalizedAliases = (aliases || []).map(function (alias) {
    return normalizeHeader_(alias);
  });

  for (var index = 0; index < (headers || []).length; index += 1) {
    var normalizedHeader = normalizeHeader_(headers[index]);
    if (normalizedAliases.indexOf(normalizedHeader) !== -1) {
      return index;
    }
  }

  return -1;
}

function getObjectValueByAliases_(obj, aliases) {
  if (!obj || typeof obj !== 'object') return '';

  var entries = Object.keys(obj);
  for (var i = 0; i < entries.length; i += 1) {
    var key = entries[i];
    var normalizedKey = normalizeHeader_(key);
    for (var j = 0; j < (aliases || []).length; j += 1) {
      if (normalizedKey === normalizeHeader_(aliases[j])) {
        return obj[key];
      }
    }
  }

  return '';
}
