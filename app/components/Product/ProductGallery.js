import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ProductCard from '../CardPaper/ProductCard';
import ProductDetail from './ProductDetail';

function ProductGallery(props) {
  const [open, setOpen] = useState(false);
  const {
    dataProduct,
    handleAddToCart,
    productIndex,
    keyword,
    listView,
    showDetail
  } = props;

  const handleDetailOpen = (product) => {
    setOpen(true);
    showDetail(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ProductDetail
        open={open}
        close={handleClose}
        detailContent={dataProduct}
        productIndex={productIndex}
        handleAddToCart={handleAddToCart}
      />
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={3}
      >
        {
          dataProduct.map((product, index) => {
            if (product.get("0").get('urun').get("adi").toLowerCase().indexOf(keyword) === -1) {
              return false;
            }
            console.log("products")
            console.log(product.get("0"));
            const itemAttr = {
              id: product.get("0").get('id'),
              name: product.get("0").get('kullanici').get("ad"),
              thumbnail: product.get('thumbnail'),
              price: product.get('price'),
              quantity: 1
            };
            return (
              <Grid item md={listView === 'list' ? 12 : 4} sm={listView === 'list' ? 15 : 6} xs={12} key={index.toString()}>
                <ProductCard
                  list={listView === 'list'}
                  name={product.get("0").get('urun').get("adi")}
                  thumbnail={product.get('thumbnail')}
                  desc={product.get('desc')}
                  ratting={product.get('ratting')}
                  price={product.get('price')}
                  barkod={product.get('barkod')}
                  prevPrice={product.get('prevPrice')}
                  discount={product.get('discount')}
                  soldout={product.get('soldout')}
                  detailOpen={() => handleDetailOpen(product)}
                  addToCart={() => handleAddToCart(itemAttr)}
                />
              </Grid>
            );
          })
        }
      </Grid>
    </div>
  );
}

ProductGallery.propTypes = {
  dataProduct: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  productIndex: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired
};

export default ProductGallery;
