import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { useSelector, useDispatch } from 'react-redux';
import { SearchProduct, ProductGallery, Notification } from 'dan-components';
import {
  fetchAction,
  addAction,
  removeAction,
  checkoutAction,
  detailAction,
  searchAction,
  closeNotifAction
} from './reducers/ecommerceActions';
import data from './api/productData';
import getUrun from './api/productApi';


function Ecommerce() {
  // Redux State
  const reducer = 'ecommerce';
  const keyword = useSelector(state => state.getIn([reducer, 'keywordValue']));
  const dataProduct = useSelector(state => state.getIn([reducer, 'productList']));
  const dataCart = useSelector(state => state.getIn([reducer, 'cart']));
  const productIndex = useSelector(state => state.getIn([reducer, 'productIndex']));
  const totalItems = useSelector(state => state.getIn([reducer, 'totalItems']));
  const totalPrice = useSelector(state => state.getIn([reducer, 'totalPrice']));
  const messageNotif = useSelector(state => state.getIn([reducer, 'notifMsg']));

  // Dispatcher
  const fetchData = useDispatch();
  const search = useDispatch();
  const handleAddToCart = useDispatch();
  const removeItem = useDispatch();
  const showDetail = useDispatch();
  const checkout = useDispatch();
  const closeNotif = useDispatch();

  const [listView, setListView] = useState('grid');
  
  const [dataIlan, setDataIlan] = useState('');
  const dataUrun=async()=>{
    try {
    
      const response= await getUrun();
      
      const authState=[{
          ...response.data
  
      }];
      
      
      fetchData(fetchAction(authState));
    
      
      } catch (e) {
       
      }
  }
  useEffect(() => {
    dataUrun();

    //fetchData(fetchAction(dataIlan));
    
  }, []);

  const handleSwitchView = (event, value) => {
    setListView(value);
  };

  const title = brand.name + ' - Ecommerce';

  const description = brand.desc;

  return (
    <div>
     <ProductGallery
        listView={listView}
        dataProduct={dataProduct}
        showDetail={(payload) => showDetail(detailAction(payload))}
        handleAddToCart={(payload) => handleAddToCart(addAction(payload))}
        productIndex={productIndex}
        keyword={keyword}
      />
    </div>
  );
}

export default Ecommerce;
/*<Notification close={() => closeNotif(closeNotifAction)} message={messageNotif} />
      <SearchProduct
        dataCart={dataCart}
        dataProduct={dataProduct}
        removeItem={(payload) => removeItem(removeAction(payload))}
        checkout={() => checkout(checkoutAction)}
        totalItems={totalItems}
        totalPrice={totalPrice}
        search={(payload) => search(searchAction(payload))}
        keyword={keyword}
        listView={listView}
        handleSwitchView={handleSwitchView}
      />
      <ProductGallery
        listView={listView}
        dataProduct={dataProduct}
        showDetail={(payload) => showDetail(detailAction(payload))}
        handleAddToCart={(payload) => handleAddToCart(addAction(payload))}
        productIndex={productIndex}
        keyword={keyword}
      />*/