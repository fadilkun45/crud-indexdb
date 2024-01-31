import { Button, VStack } from '@chakra-ui/react'
import './App.css'
import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';
import TestComponent from './testComponent';

function App() {


  const init = () => {
    openDB("dataDB", 1, {
      upgrade(db) {
        let dbForIndex = db.createObjectStore("data1", { autoIncrement: true });
        dbForIndex.createIndex('uuid', 'uuid', { unique: true, });

      }
    })
  }

  const tambahData = async () => {
    const db = await openDB("dataDB", 1)

    db.add("data1", {
      uuid: uuidv4(),
      nama: "nama orang"
    })
  }

  const getDataByID = async ({ paramId = "6fd3ccd9-918b-4135-ba7e-e7f4cebf9030" }) => {
    const db = await openDB("dataDB", 1)

    let results = await db.getFromIndex("data1", "uuid", paramId);

    console.log("By Id", paramId, results)
  }

  const getAll = async () => {
    const db = await openDB("dataDB", 1)

    let results = await db.getAll("data1");

    console.log("get all", results)
  }

  const deleteById =  async ({ paramId = "6fd3ccd9-918b-4135-ba7e-e7f4cebf9030" })=> {
    const db = await openDB("dataDB", 1)


    const objectStore = await db.delete('data1', paramId)
  
    
    console.log(objectStore)



  }


  console.log("render")

  return (
    <>
      <VStack>
        <Button onClick={init}>init</Button>
        <Button onClick={tambahData}>tambah data</Button>
        <Button onClick={getDataByID}>coba get data</Button>
        <Button onClick={getAll}>coba get data All</Button>
        <Button onClick={deleteById}>Hapus</Button>

      </VStack>

      <TestComponent />

    </>
  )
}

export default App
