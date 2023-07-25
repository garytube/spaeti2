migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ef8eh229e3k2gu5")

  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ef8eh229e3k2gu5")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxvkg6oc",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "beer",
        "mate",
        "coke",
        "life"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
