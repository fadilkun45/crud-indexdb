import React, { useEffect, useState } from 'react';
import { Button, Flex, Input, Modal, Table, Typography, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';

interface DataType {
  key: string;
  name: string;
  alamat: string;
  pesanan: string;
}


const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    alamat: 'Bekasi',
    pesanan: 'makanan kucing'
  },
  {
    key: '2',
    name: 'Jim Green',
    alamat: 'Jakarta',
    pesanan: 'lemari baju'
  },
  {
    key: '3',
    name: 'Joe Black',
    alamat: 'Tanggerang',
    pesanan: 'kue kering'
  },
];





function Page1() {

  const [modalEdit, setModalEdit] = useState(false)

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      key: 'alamat',
    },
    {
      title: 'Pesanan',
      dataIndex: 'pesanan',
      key: 'pesanan',
    },
    {
      title: 'Detail',
      key: 'action',
      render: () => <Button onClick={() => setModalEdit(true)}>Edit</Button>
    },
  ];



  const handleSubmit = () => {
    setModalEdit(!modalEdit)
    Modal.success({
      title: "success",
      content: "data berhasil di simpan",
      okText: "tutup"
    })
  }

  useEffect(() => {
    axios.get("/data").then(({data}) => {
      console.log(data)
    })
  },[])



  return (
    <>
    
      <Modal open={modalEdit} title="Edit Data" closeIcon={false} destroyOnClose
        footer={[
          <Button type='primary' onClick={() => handleSubmit()}>submit</Button>
        ]}
      >
        <Typography style={{ marginBottom: "6px" }}>Nama</Typography>
        <Input name="" />
        <Typography style={{ marginTop: "6px", marginBottom: "6px" }}>Alamat</Typography>
        <TextArea name="" />
        <Typography style={{ marginTop: "6px", marginBottom: "6px" }}>Pesanan</Typography>
        <Input name="" />
      </Modal>

      <Flex vertical style={{ width: "100%" }} >
        <Title level={4} style={{ textAlign: "center" }}>crud indexdb</Title>
        <Flex style={{ width: "80%", margin: "0 auto" }} >
          <Table columns={columns} bordered dataSource={data} style={{ width: "100%" }} />
        </Flex>
      </Flex>
    </>
  )
}

export default Page1
