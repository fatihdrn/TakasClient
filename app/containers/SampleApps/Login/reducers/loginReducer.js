import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import { CLOSE_NOTIF } from 'dan-redux/constants/notifConstants';
import {
  LOGGEDIN
} from './loginConstants';

const initialState = {
  user: '',
  login: false,
  
};

const initForm = Map({
  title: '',
  start: new Date(),
  end: new Date(),
  hexColor: 'EC407A',
});

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case LOGGEDIN:
      return state.withMutations((mutableState) => {
       console.log('girdi');
       
        mutableState
        .set('user','fatih')
        .set('login', true);

      });
   
    default:
      return state;
  }
}
