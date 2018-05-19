import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import setLocalStorageMock from './mocks/localStorageMock';

setLocalStorageMock();

Enzyme.configure({ adapter: new Adapter() });
