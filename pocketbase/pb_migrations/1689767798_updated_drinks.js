migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pfoaa8ot80iflek")

  collection.viewRule = ""

  // remove
  collection.schema.removeField("fexyuybl")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pfoaa8ot80iflek")

  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fexyuybl",
    "name": "barcode",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
