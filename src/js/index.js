import 'jquery';
import './vendor/jquery.waypoints.min';
import 'owl.carousel';
import 'jquery-scrollify';
import './vendor/jquery.counterup.min';
import googleTagManager from './utils/googleTagManager';
import navigationHandler from './utils/Navigation';
import counter from './utils/Counter';
import scrollify from './utils/Scrollify';
import testimonialCarousel from './utils/TestimonialCarousel';
import popup from './utils/Popup';
import cookies from './utils/Cookies';
import smallText from './utils/SmallText';
import inputFile from './utils/InputFile';

//import aws_s3 from './utils/aws_s3';

googleTagManager(window, document, 'script', 'dataLayer', 'GTM-PRTTW9W');
navigationHandler();
counter();
scrollify();
testimonialCarousel();
popup();
cookies();
smallText();
inputFile();
//aws_s3();
