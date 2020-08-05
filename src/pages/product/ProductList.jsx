import React,{ useState,useEffect } from 'react';
import { Row,Col,Select,Input,Button,Table,Space,Tag,Popconfirm } from 'antd';
import { getProductList,searchProductList,changeProductStatus } from '@service/product';
import { NavLink } from 'react-router-dom';
const { Option } = Select
const ProductList = (props) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '信息',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (text,record) => '￥' + record.price
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text,row) => {
                return (
                    <Space size="middle">
                        <span>{ row.status === 1 ? '在售' : '已下架' }</span>
                        <Popconfirm
                            title={`确认${row.status === 1 ? '下架' : '上架'}？`}
                            onConfirm={e => confirm(row.id,row.status)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Tag 
                                style={{cursor: 'pointer'}}
                            >{ row.status === 1 ? '下架' : '上架' }</Tag>
                        </Popconfirm>
                    </Space>
                )
            }
    
        },
        {
            title: '操作',
            dataIndex: 'option',
            key: 'option',
            render: (text,row) => {
                return (
                    <Space size="small">
                        <NavLink to={'/product/detail/'+row.id}>查看</NavLink>
                        <NavLink to={'/product/edit/'+row.id}>编辑</NavLink>
                    </Space>
                )
            }
        },
    ]
    const [ productList,setProductList ] = useState([]);
    const [ pageSize,setPagesize ] = useState(10);
    const [ pageNum,setPageNum ] = useState(1);
    const [ total,setTotal ] = useState(0);
    const [ selectedValue,setSelectedValue ] = useState('productId');
    const [ inputValue,setInputValue ] = useState('');
    const fetchData = async () => {
        const data = await getProductList(pageSize,pageNum);
        setProductList(data.data.data.list);
        setTotal(data.data.data.total)
    } 
    useEffect(() => {
        fetchData()
    },[])
    const handleChangePage = (pageNum,pageSize) => {
        setPageNum(pageNum);
        setPagesize(pageSize);
    }
    const handleSearch = async () => {
        const data = await searchProductList(pageNum,selectedValue,inputValue);
        setProductList(data.data.data.list);
        setTotal(data.data.data.total);
    }
    const resetForm = () => {
        setInputValue('');
        fetchData();
    }
    const confirm = (productId,status) => {
        handleChangeStatus(productId,status)
    }
    const handleChangeStatus = async (productId,status) => {
        const targetStatus = status === 2 ? 1 : 2;
        await changeProductStatus(productId,targetStatus);
        fetchData();
    }
    return (
        <div>
            <Row gutter={10}>
                <Col span={4}>
                    <Select 
                        defaultValue="productId" 
                        style={{width: '100%'}} 
                        value={selectedValue}
                        onChange={value => setSelectedValue(value)}
                    >
                        <Option value="productId">按id查询</Option>
                        <Option value="productName">按名称查询</Option>
                    </Select>
                </Col>
                <Col span={3}>
                    <Input 
                        placeholder='请输入' 
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                </Col>
                <Col span={6}>
                    <Space size="small">
                        <Button type='primary' onClick={e => handleSearch()}>查询</Button>
                        <Button onClick={e => resetForm()}>重置</Button>
                    </Space>
                </Col>
            </Row>
            <Table 
                columns={columns} 
                dataSource={productList}
                style={{marginTop: '10px'}}
                pagination={{
                    position: ['bottomRight'],
                    total: total,
                    onChange: (pageNum,pageSize) => handleChangePage(pageNum,pageSize)
                }}
            />
        </div>
    )
}

export default ProductList;