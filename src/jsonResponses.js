const respondJSON = (request, response, status, object, type) => {
  /* const headers = {
    'Content-type': 'application/json',
  }; */

  response.writeHead(status, { 'Content-type': `${type || 'application/json'}` });
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response, params, type) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'success',
  };

  respondJSON(request, response, 200, responseJSON, type);
};

const badRequest = (request, response, params, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'badRequest',
  };
  let status = 400;

  if (!params.valid || !params.vald === 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    status = 400;
  }

  respondJSON(request, response, status, responseJSON, type);
};

const unauthorized = (request, response, params, type) => {
  let status = 401;
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  if (params.loggedIn || params.loggedIn === 'true') {
    responseJSON.message = 'This request has the required parameters';
    status = 401;
  }

  respondJSON(request, response, status, responseJSON, type);
};

const forbidden = (request, response, params, type) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, responseJSON, type);
};

const internalError = (request, response, params, type) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  respondJSON(request, response, 500, responseJSON, type);
};

const notImplemented = (request, response, params, type) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, responseJSON, type);
};

const notFound = (request, response, params, type) => {
  const responseJSON = {
    message: 'Page you are looking for was not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON, type);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
  notFound,
};
