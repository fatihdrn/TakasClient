import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Type from 'dan-styles/Typography.scss';
import styles from './cart-jss';

function Cart(props) {
  const {
    classes,
    anchorEl,
    close,
    dataCart,
    removeItem,
    totalPrice,
    checkout
  } = props;

  const getCartItem = dataArray => dataArray.map((item, index) => (
    <Fragment key={index.toString()}>
      <ListItem>
        <figure>
          <img src={item.get('thumbnail')} alt="thumb" />
        </figure>
        <ListItemText
          primary={item.get('name')}
          secondary={`Adet: ${item.get('quantity')} Item - TL ${item.get('price') * item.get('quantity')}`}
          className={classes.itemText}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments" onClick={() => removeItem(item)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <li>
        <Divider />
      </li>
    </Fragment>
  ));
  return (
    <Menu
      id="cart-menu"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={close}
      className={classes.cartPanel}
    >
      <List
        component="ul"
        subheader={(
          <ListSubheader component="div">
            <ShoppingCartIcon />
              Toplam :&nbsp;
            {dataCart.size}
              &nbsp;Ürün Sepette
          </ListSubheader>
        )}
        className={classes.cartWrap}
      >
        {
          dataCart.size < 1 ? (
            <div className={classes.empty}>
              <Typography variant="subtitle1">Sepet Boş</Typography>
              <Typography variant="caption">Sepetteki ürünler burada listelenmektedir.</Typography>
            </div>
          ) : (
            <Fragment>
              {getCartItem(dataCart)}
              <ListItem className={classes.totalPrice}>
                <Typography variant="subtitle1">
                    Toplam :
                  <span className={Type.bold}>
                  ₺
                    {totalPrice}
                  </span>
                </Typography>
              </ListItem>
              <li>
                <Divider />
              </li>
              <ListItem>
                <Button fullWidth className={classes.button} variant="contained" onClick={() => checkout()} color="secondary">
                    ONAYLA
                </Button>
              </ListItem>
            </Fragment>
          )
        }
      </List>
    </Menu>
  );
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
  dataCart: PropTypes.object.isRequired,
  anchorEl: PropTypes.object,
  close: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

Cart.defaultProps = {
  anchorEl: null,
};

export default withStyles(styles)(Cart);
