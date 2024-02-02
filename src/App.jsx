/* eslint-disable no-unused-vars */
import { Button, HStack, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import './App.css'
import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';
import TestComponent from './testComponent';
import { useEffect, useMemo, useState } from 'react';

function App() {
const [formData, setFormData] = useState({
  nama: '' ,
  alamat: '' ,
  uuid: '',
})

const [isEdit, setIsEdit] = useState(false)
const [listData, setListData] = useState([])

const DefaultFormData = useMemo(() => {
    return {
      nama: '' ,
      alamat: '' ,
      uuid: '',
    }
},[])

  const init = () => {
    openDB("dataDB", 1, {
      upgrade(db) {
        let dbForIndex = db.createObjectStore("data1", { autoIncrement: true });
        dbForIndex.createIndex('uuid', 'uuid', { unique: true, });

      }
    })
  }

  useEffect(() => {
    init()
    getAll()
  },[])


  const tambahData = async () => {
    const db = await openDB("dataDB", 1)

    db.add("data1", {
      uuid: uuidv4(),
      nama: formData.nama,
      alamat: formData.alamat
    })

    setFormData(DefaultFormData)
    getAll()
  }



  const getDataByID = async ({ paramId = "6fd3ccd9-918b-4135-ba7e-e7f4cebf9030" }) => {
    const db = await openDB("dataDB", 1)

    let results = await db.getFromIndex("data1", "uuid", paramId);

    console.log("By Id", paramId, results)
  }

  const getAll = async () => {
    const db = await openDB("dataDB", 1)

    let results = await db.getAll("data1");

    setListData(results)

    console.log("get all", results)
  }

  const deleteById = async (paramId) => {
    const db = await openDB("dataDB", 1)

    console.log(paramId)

    const transaction = db.transaction(["data1"], "readonly");

    const objectStoreData = await transaction.objectStore("data1");

    const Index = objectStoreData.index("uuid");

    const getKeyRequest = await Index.getKey(paramId);

    db.delete("data1",getKeyRequest)

    getAll()

  }

  const editData = async (paramId) => {
    const db = await openDB("dataDB", 1)

    console.log(paramId)

    const transaction = db.transaction(["data1"], "readonly");

    const objectStoreData = await transaction.objectStore("data1");

    const myIndex = objectStoreData.index("uuid");

    const getKeyRequest = await myIndex.getKey(formData.uuid);

    db.put("data1",formData, getKeyRequest)

    setFormData({
      nama: "",
      alamat: "",
      uuid: ""
    })
    getAll()
    setIsEdit(false)

  }

  const handleEditData = (item) => {
    setFormData(item)
    setIsEdit(true)
  }



  return (
    <>
      <VStack>
        {/* <Button onClick={init}>init</Button> */}
        {/* <Button onClick={getDataByID}>coba get data</Button> */}
        {/* <Button onClick={getAll}>coba get data All</Button> */}
        {/* <Button onClick={deleteById}>Hapus</Button> */}
        <Text>React CRUD with indexdb</Text>
      </VStack>

      <VStack my="20px">
        
        <HStack>
          <Text>Nama</Text>
          <Input value={formData.nama} onChange={(v) => setFormData({...formData, nama: v.target.value})} />
        </HStack>

        <HStack mt="12px">
          <Text>Alamat</Text>
          <Input value={formData.alamat} onChange={(v) => setFormData({...formData, alamat: v.target.value})} />
        </HStack>

        <Button mt="12px" onClick={() =>  isEdit ? editData() : tambahData() }>tambah data</Button>
        <Button mt="12px" display={isEdit ? "" : "none"} onClick={() => {setFormData(DefaultFormData);setIsEdit(false)} }>batal edit</Button>
      </VStack>

      <TableContainer w="100%">
        <Table w="full" variant='striped'>
          <Thead>
            <Tr>
              <Th>no</Th>
              <Th>Nama</Th>
              <Th>Alamat</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              listData.map((item,index) => (
                <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item?.nama}</Td>
                <Td>{item?.alamat}</Td>
                <Td>
                  <Button colorScheme="blue" mr="19px" onClick={() => handleEditData(item)}>Edit</Button><Button colorScheme="red" onClick={() => deleteById(item?.uuid)}>Delete</Button>
                  </Td>
              </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>


      {/* <TestComponent /> */}

    </>
  )
}

export default App
