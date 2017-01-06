import Inferno from 'inferno';
import Header from './components/header/Default';
import './Default.scss';

// Render the component tree into the chosen node.
Inferno.render(<Header />, document.querySelector('section.app'));
