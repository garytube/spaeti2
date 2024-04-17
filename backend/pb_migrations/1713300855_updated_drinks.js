/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcvqcirhf3tjrar")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qgeghlkt",
    "name": "active",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eao3fjay",
    "name": "pic",
    "type": "file",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/webp",
        "image/png",
        "image/jpeg"
      ],
      "thumbs": [
        "0x210"
      ],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcvqcirhf3tjrar")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qgeghlkt",
    "name": "active",
    "type": "bool",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eao3fjay",
    "name": "pic",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/webp",
        "image/png",
        "image/jpeg"
      ],
      "thumbs": [
        "0x210"
      ],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
