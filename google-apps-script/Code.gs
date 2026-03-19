const ALLOWED_ORIGIN = 'https://philippine-roadwatch.github.io';
const REPORT_HEADERS = [
  'timestamp',
  'tracking',
  'lastname',
  'firstname',
  'mi',
  'email',
  'phone',
  'location',
  'issue',
  'roadType',
  'roadClass',
  'roadSurfaceMaterial',
  'numberOfLanes',
  'roadDirection',
  'trafficVolume',
  'roadSpeedLimit',
  'pedestrianActivity',
  'schoolZone',
  'commercialArea',
  'residentialArea',
  'barangay',
  'districtZone',
  'coordinatesDisplay',
  'elevation',
  'drainageStatus',
  'slopeGradient',
  'sidewalkCondition',
  'streetLighting',
  'roadMarkings',
  'curbsGutters',
  'busStopNearby',
  'parkingSpaceAvailable',
  'accidentProneArea',
  'nearIntersection',
  'curveTurnSeverity',
  'visibility',
  'nighttimeLightingAdequate',
  'recentWeatherImpact',
  'lastMaintenanceDate',
  'maintenanceFrequency',
  'previousIssues',
  'ongoingConstruction',
  'hospitalNearby',
  'schoolNearby',
  'marketCommercialHub',
  'residentialComplex',
  'publicTransportRoute',
  'connectedRoadBridgeName',
  'alternativeRouteAvailable',
  'criticalRoute',
  'tourismRoute',
  'agriculturalAreaRoad',
  'seasonalIssues',
  'treeCoverage',
  'adjacentWaterBody',
  'soilType',
  'roadConditionIndex',
  'averageIssueResolutionTime',
  'budgetCategory',
  'jurisdictionAuthority',
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
    location: params.location || '',
    issue: params.issue || '',
    roadType: params.roadType || '',
    roadClass: params.roadClass || '',
    roadSurfaceMaterial: params.roadSurfaceMaterial || '',
    numberOfLanes: params.numberOfLanes || '',
    roadDirection: params.roadDirection || '',
    trafficVolume: params.trafficVolume || '',
    roadSpeedLimit: params.roadSpeedLimit || '',
    pedestrianActivity: params.pedestrianActivity || '',
    schoolZone: params.schoolZone || '',
    commercialArea: params.commercialArea || '',
    residentialArea: params.residentialArea || '',
    barangay: params.barangay || '',
    districtZone: params.districtZone || '',
    coordinatesDisplay: params.coordinatesDisplay || '',
    elevation: params.elevation || '',
    drainageStatus: params.drainageStatus || '',
    slopeGradient: params.slopeGradient || '',
    sidewalkCondition: params.sidewalkCondition || '',
    streetLighting: params.streetLighting || '',
    roadMarkings: params.roadMarkings || '',
    curbsGutters: params.curbsGutters || '',
    busStopNearby: params.busStopNearby || '',
    parkingSpaceAvailable: params.parkingSpaceAvailable || '',
    accidentProneArea: params.accidentProneArea || '',
    nearIntersection: params.nearIntersection || '',
    curveTurnSeverity: params.curveTurnSeverity || '',
    visibility: params.visibility || '',
    nighttimeLightingAdequate: params.nighttimeLightingAdequate || '',
    recentWeatherImpact: params.recentWeatherImpact || '',
    lastMaintenanceDate: params.lastMaintenanceDate || '',
    maintenanceFrequency: params.maintenanceFrequency || '',
    previousIssues: params.previousIssues || '',
    ongoingConstruction: params.ongoingConstruction || '',
    hospitalNearby: params.hospitalNearby || '',
    schoolNearby: params.schoolNearby || '',
    marketCommercialHub: params.marketCommercialHub || '',
    residentialComplex: params.residentialComplex || '',
    publicTransportRoute: params.publicTransportRoute || '',
    connectedRoadBridgeName: params.connectedRoadBridgeName || '',
    alternativeRouteAvailable: params.alternativeRouteAvailable || '',
    criticalRoute: params.criticalRoute || '',
    tourismRoute: params.tourismRoute || '',
    agriculturalAreaRoad: params.agriculturalAreaRoad || '',
    seasonalIssues: params.seasonalIssues || '',
    treeCoverage: params.treeCoverage || '',
    adjacentWaterBody: params.adjacentWaterBody || '',
    soilType: params.soilType || '',
    roadConditionIndex: params.roadConditionIndex || '',
    averageIssueResolutionTime: params.averageIssueResolutionTime || '',
    budgetCategory: params.budgetCategory || '',
    jurisdictionAuthority: params.jurisdictionAuthority || '',
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
    'Kindly keep this information for your records and future follow-ups.',
    '',
    'Thank you once again for your support and cooperation.',
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
  return fullName || 'RoadWATCH PH User';
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

  const headers = values[0].map(function (header) { return String(header || '').trim().toLowerCase(); });
  const trackingColumnIndex = headers.indexOf('tracking');
  const statusColumnIndex = headers.indexOf('status');

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

  ensureReportHeaders_(sheet);

  return sheet;
}

function ensureReportHeaders_(sheet) {
  const requiredColumnCount = REPORT_HEADERS.length;

  if (sheet.getMaxColumns() < requiredColumnCount) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), requiredColumnCount - sheet.getMaxColumns());
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(REPORT_HEADERS);
    return;
  }

  const existingHeaders = sheet.getRange(1, 1, 1, requiredColumnCount).getValues()[0]
    .map(function (header) { return String(header || '').trim(); });

  const headersMatch = REPORT_HEADERS.every(function (header, index) {
    return existingHeaders[index] === header;
  });

  if (!headersMatch) {
    sheet.getRange(1, 1, 1, requiredColumnCount).setValues([REPORT_HEADERS]);
  }
}

function appendReport_(row) {
  const sheet = getSheet_();
  const columnCount = REPORT_HEADERS.length;
  const trackingColumnIndex = REPORT_HEADERS.indexOf('tracking');
  const trackingValue = String(row.tracking || '').trim();
  const dataRowCount = Math.max(sheet.getLastRow() - 1, 0);
  const dataValues = dataRowCount > 0
    ? sheet.getRange(2, 1, dataRowCount, columnCount).getValues()
    : [];

  if (trackingValue && trackingColumnIndex !== -1) {
    const existingTrackings = dataValues
      .map(function (rowValues) { return String(rowValues[trackingColumnIndex] || '').trim(); })
      .filter(function (value) { return value !== ''; });

    if (existingTrackings.includes(trackingValue)) {
      return { duplicate: true };
    }
  }

  const valuesToWrite = [REPORT_HEADERS.map(function (header) {
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
    var rowTracking = String(reports[i].tracking || '').trim().toLowerCase();
    if (rowTracking === trackingValue) {
      return reports[i];
    }
  }

  return null;
}
