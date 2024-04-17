/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcvqcirhf3tjrar")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcvqcirhf3tjrar")

  // remove
  collection.schema.removeField("eao3fjay")

  return dao.saveCollection(collection)
})
