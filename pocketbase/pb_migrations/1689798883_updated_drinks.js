migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pfoaa8ot80iflek")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p1a1oe2s",
    "name": "barcode",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pfoaa8ot80iflek")

  // remove
  collection.schema.removeField("p1a1oe2s")

  return dao.saveCollection(collection)
})
