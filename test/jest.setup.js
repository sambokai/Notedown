import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './mocks/localStorageMock';
import * as Note from '../src/js/model/Note';


beforeEach(() => {
  localStorage.clear();
  Note.reset();
});

Enzyme.configure({ adapter: new Adapter() });
