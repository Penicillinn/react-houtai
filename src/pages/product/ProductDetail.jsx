import React,{ useEffect,useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getDetail,getCategory,editProduct } from '@service/product';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
  } from 'antd';
  const { Option } = Select;
const ProductDetail =(props) => {
    const [detail,setDetail] = useState({})
    const [categoryList,setCategoryList] = useState([])
    const [parentCateList,setParentCateList] = useState([])
    const isDetail = props.match.url.indexOf('detail') === -1 ? false : true;
    const [form] = Form.useForm();
    const fetchData = async () => {
        const id = props.match.params.id;
        const data = await getDetail(id);
        const categoryData = await getCategory(0);
        const parentCate = await getCategory(data.data.data.parentCategoryId);
        form.setFieldsValue(data.data.data);
        setDetail(data.data.data);
        setCategoryList(categoryData.data.data);
        setParentCateList(parentCate.data.data);
    }
    useEffect(() => {
        fetchData();
    },[])
    const handleChangeSelect = async (value) => {
        const categoryData = await getCategory(value);
        setParentCateList(categoryData.data.data);
    }
    const handlesave = async () => {
        // categoryId: 
        // name: 
        // subtitle: 
        // subImages: 
        // detail: 
        // price: 
        // stock: 
        // status: 
        // id: 
        console.log(form.getFieldsValue());
        const detailInfo = {
            ...form.getFieldsValue(),
            id: detail.id,
            status: detail.status
        }
        await editProduct(detailInfo);
        props.history.push('/product/list')
    }
    return (
        <div style={{width: '60%', margin: '10px auto'}}>
            <Form
                name="register"
                layout='vertical'
                form={form}
                initialValues={{
                    categoryId: detail.categoryId
                }}
            >
                 <Form.Item
                    name="name"
                    label="商品名称"
                >
                    <Input disabled={isDetail} />
                </Form.Item>
                 <Form.Item
                    name="subtitle"
                    label="商品描述"
                >
                    <Input disabled={isDetail} />
                </Form.Item>
                 <Form.Item
                    name="categoryId"
                    label="所属分类"
                >
                    <Row gutter={10}>
                        <Col span={12}>
                            <Select disabled={isDetail} onChange={value => handleChangeSelect(value)}>
                                {
                                    categoryList.map(item => {
                                        return (
                                            <Option value={item.id} key={item.id}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                        {
                            detail.parentCategoryId === 1 ? null : (
                                <Col span={12}>
                                    <Select disabled={isDetail}>
                                        {
                                            parentCateList.map(item => {
                                                return (
                                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Col>
                            )
                        }
                        
                    </Row>
                    
                </Form.Item>
                 <Form.Item
                    name="price"
                    label="商品价格"
                >
                    <Input disabled={isDetail} />
                </Form.Item>
                 <Form.Item
                    name="stock"
                    label="商品库存"
                >
                    <Input disabled={isDetail} />
                </Form.Item>
                 <Form.Item
                    name="subImages"
                    label="商品图片"
                >
                    <img style={{ width:'100px',height: '100px' }} src={`${detail.imageHost}${detail.subImages}`} alt=''></img>
                </Form.Item>
            </Form>
            {isDetail ? null : <Button onClick={e => handlesave()}>保存</Button>}
        </div>
    )
}

export default withRouter(ProductDetail);