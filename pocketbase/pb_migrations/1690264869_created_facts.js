migrate((db) => {
  const collection = new Collection({
    "id": "ef8eh229e3k2gu5",
    "created": "2023-07-25 06:01:09.858Z",
    "updated": "2023-07-25 06:01:09.858Z",
    "name": "facts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lwebcszi",
        "name": "text",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "gfsnbufg",
        "name": "active",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "zxvkg6oc",
        "name": "type",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 2,
          "values": [
            "beer",
            "mate",
            "coke",
            "life"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ef8eh229e3k2gu5");

  return dao.deleteCollection(collection);
})
