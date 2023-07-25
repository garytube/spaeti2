migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pfoaa8ot80iflek")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ykclopt",
    "name": "fact_type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "beer",
        "mate",
        "coke"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pfoaa8ot80iflek")

  // remove
  collection.schema.removeField("8ykclopt")

  return dao.saveCollection(collection)
})
