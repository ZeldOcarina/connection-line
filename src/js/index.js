import 'jquery';
import './vendor/jquery.waypoints.min';
import 'owl.carousel';
import 'jquery-scrollify';
import './vendor/jquery.counterup.min';
import navigationHandler from './utils/Navigation';
import counter from './utils/Counter';
import scrollify from './utils/Scrollify';
import testimonialCarousel from './utils/TestimonialCarousel';
import popup from './utils/Popup';
import cookies from './utils/Cookies';
import smallText from './utils/SmallText';
import inputFile from './utils/InputFile';
import register from './controller/auth/register';

//import aws_s3 from './utils/aws_s3';

navigationHandler();
counter();
scrollify();
testimonialCarousel();
popup();
cookies();
smallText();
inputFile();
//aws_s3();
register();
