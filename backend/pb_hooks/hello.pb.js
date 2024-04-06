// Example Route for Hooks
// https://pocketbase.io/docs/js-overview/

routerAdd('GET', '/hello/:name', (c) => {
  let name = c.pathParam('name');
  return c.json(200, { message: 'Hello ' + name });
});
