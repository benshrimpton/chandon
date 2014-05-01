<?php

/**
 *  MX Mobile Detect Class for ExpressionEngine2
 *
 * @package  ExpressionEngine
 * @subpackage Plugins
 * @category Plugins
 * @author    Max Lazar <max@eec.ms>
 * @Commercial - please see LICENSE file included with this distribution
 */


require_once PATH_THIRD . 'mobile_detect/config.php';

$plugin_info = array(
	'pi_name' => MX_MOBILE_DETECT_NAME,
	'pi_version' => MX_MOBILE_DETECT_VER,
	'pi_author' => MX_MOBILE_DETECT_AUTHOR,
	'pi_author_url' => MX_MOBILE_DETECT_DOCS,
	'pi_description' => MX_MOBILE_DETECT_DESC,
	'pi_usage' => mobile_detect::usage()
);


class Mobile_detect {
	var $return_data = "";
	var $location = '';
	var $conds = array ();
	var $cache;
	var $enable;
	var $cookie_value;
	var $redirect;
	var $cookie_name;
	var $client_request;
	var $ignore_cookies;
	var $refresh;
	var $agent;
	var $cookie_expire = 86500;

	/**
	 * Mobile_detect function.
	 *
	 * @access public
	 * @return void
	 */
	public function Mobile_detect() {

		$this->EE =& get_instance();

		$this->cache =& $this->EE->session->cache[__CLASS__];

		$this->EE->load->helper( 'url' );

		$uri_string = $this->EE->uri->uri_string();

		$this->location = ( !$this->EE->TMPL->fetch_param( 'location' ) ) ? false : str_replace( "{uri}",
			$this->EE->uri->uri_string(), $this->EE->TMPL->fetch_param( 'location' ) );
		$this->redirect   = ( !$this->EE->TMPL->fetch_param( 'redirect' ) ) ? ( 'mobile' ) : $this->EE->TMPL->fetch_param( 'redirect' );
		$this->client_request = ( !$this->EE->TMPL->fetch_param( 'client' ) ) ? false : $this->EE->TMPL->fetch_param( 'client' );
		$this->cookie_name = ( !$this->EE->TMPL->fetch_param( 'cookie_name' ) ) ? 'mobile_redirect' : $this->EE->TMPL->fetch_param( 'cookie_name' );
		$this->cookie_value  = ( !$this->EE->TMPL->fetch_param( 'cookie_value' ) ) ? 'on' : $this->EE->TMPL->fetch_param( 'cookie_value' );
		$this->enable   = ( !$this->EE->TMPL->fetch_param( 'enable' ) ) ? false : ( ( $this->EE->TMPL->fetch_param( 'enable' ) == 'yes' ) ? 'on' : 'off' );
		$this->ignore_cookies = ( !$this->EE->TMPL->fetch_param( 'ignore_cookies' ) ) ? false :
		( ( $this->EE->TMPL->fetch_param( 'ignore_cookies' ) == 'yes' ) ? true : false );
		$this->refresh = ( !$this->EE->TMPL->fetch_param( 'refresh' ) ) ? false :
		( ( $this->EE->TMPL->fetch_param( 'refresh' ) == 'yes' ) ? true : false );

		$this->device_detect( $this->refresh );

		$this->conds['mobile'] = ( $this->client_request ) ? ( ( strpos( $agent, $this->client_request ) != 0 ) ? true : false ) :
		$this->cache['mx_mobile_device'];
		$this->conds['not_mobile'] = ( $this->conds['mobile'] !== FALSE ) ? false : true;
		$this->conds['device']  = ( $this->conds['mobile'] ) ? $this->cache['mx_mobile_device'] : 'not_mobile';

		return;
	}


	/**
	 * pair function.
	 *
	 * @access public
	 * @return void
	 */
	public function pair() {
		$tagdata  = $this->EE->TMPL->tagdata;
		$tagdata = $this->EE->functions->prep_conditionals( $tagdata, $this->conds );
		$tagdata = $this->EE->TMPL->parse_variables_row( $tagdata,  $this->conds['mobile'] );
		return $this->return_data = $tagdata;
	}

	/**
	 * screen_detect function.
	 *
	 * @access public
	 * @return void
	 */
	public function screen_detect() {
		$r = '';
		if ( $this->EE->input->cookie( 'screen_width', false ) === FALSE ) {
			$r = '<script language="javascript">
	        		ScreenDetect();
	        		function ScreenDetect()
	        		{
	        			dpr = 1;

		                if( window.devicePixelRatio !== undefined ){
		                   dpr = window.devicePixelRatio;
		                }

		                var screen_r =  getWindowSize();

		                Set_Cookie( "exp"+"_"+"screen_width", screen_r.width, "", "/", "", "");
		                Set_Cookie( "exp"+"_"+"screen_height", screen_r.height, "", "/", "", "");
 						Set_Cookie( "exp"+"_"+"pixel_ratio", dpr, "", "/", "", "");

		                location = "'.$_SERVER['PHP_SELF'].'";
	                }

					function getWindowSize() {
					    var wW, wH;
					    if (window.outerWidth) {
					        wW = window.outerWidth;
					        wH = window.outerHeight;
					    } else {
					        var cW = document.body.offsetWidth;
					        var cH = document.body.offsetHeight;
					        window.resizeTo(500,500);
					        var barsW = 500 - document.body.offsetWidth;
					        var barsH = 500 - document.body.offsetHeight;
					        wW = barsW + cW;
					        wH = barsH + cH;
					        window.resizeTo(wW,wH);
					    }
					    return { width: wW, height: wH };
					}

					function Set_Cookie( name, value, expires, path, domain, secure)
					{

					var today = new Date();
					today.setTime( today.getTime() );

					if ( expires )
					{
					expires = expires * 1000 * 60 * 60 * 24;
					}
					var expires_date = new Date( today.getTime() + (expires) );

					document.cookie = name + "=" +escape( value ) +
					( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
					( ( path ) ? ";path=" + path : "" ) +
					( ( domain ) ? ";domain=" + domain : "" ) +
					( ( secure ) ? ";secure" : "" );

					}
	            </script>';
		}
		return $r;
	}

	/**
	 * screen_size function.
	 *
	 * @access public
	 * @return void
	 */
	public function screen_size() {
		return $this->EE->input->cookie( 'screen_width', false ).'='.$this->EE->input->cookie( 'screen_height', false ).'='.
			$this->EE->input->cookie( 'pixel_ratio', '1' );
	}

	/**
	 * redirect function.
	 *
	 * @access public
	 * @return void
	 */
	public function redirect() {
		if ( $this->enable ) {
			if ( $enable == 'on' ) {
				$this->EE->functions->set_cookie( $cookie_name, 'on', $this->cookie_expire );
			} else {
				$this->EE->functions->set_cookie( $cookie_name, 'off', $this->cookie_expire );
			}

			$this->EE->functions->redirect( str_replace( '&#47;', '/', $this->location ) );
		}

		if ( ( $this->EE->input->cookie( $this->cookie_name, 'on' ) != $this->cookie_value ) || $this->ignore_cookies ) {


			if ( $this->EE->TMPL->fetch_param( $this->cache['mx_mobile_device'] ) == 'no' ) {return;}

			$this->location = ( !$this->EE->TMPL->fetch_param( $this->cache['mx_mobile_device'] ) ) ? $this->location : str_replace( "{uri}", $this->EE->uri->uri_string(), $this->EE->TMPL->fetch_param( $this->cache['mx_mobile_device'] ) );


			if ( $this->location && ( $this->conds['mobile'] !== FALSE || ( $this->conds['mobile'] === FALSE && $this->redirect == "not_mobile" ) ) ) {

				$this->EE->functions->redirect( str_replace( '&#47;', '/', $this->location ) );
				return;
			}
		}
	}

	/**
	 * device function.
	 *
	 * @access public
	 * @return void
	 */
	public function device() {
		return $this->conds['device'];
	}

	/**
	 * device_detect function.
	 *
	 * @access public
	 * @param bool    $refresh (default: false)
	 * @return void
	 */
	public function device_detect( $refresh = false ) {
		if ( isset( $this->cache['mx_mobile_device'] ) && !$refresh ) {
			return true;
		};

		if ( $this->EE->input->cookie( 'mx_mobile_device', false ) && !$refresh ) {
			$this->cache['mx_mobile_device'] = $this->EE->input->cookie( 'mx_mobile_device' );
			return true;
		}

		$client = new Client();
		$agent = $_SERVER['HTTP_USER_AGENT'];

		$this->cache['mx_mobile_device'] = $client->isMobileClient( $agent );
		$this->EE->functions->set_cookie( 'mx_mobile_device', $this->cache['mx_mobile_device'], $this->cookie_expire );

		return true;
	}

	// ----------------------------------------
	//  Plugin Usage
	// ----------------------------------------

	// This function describes how the plugin is used.
	//  Make sure and use output buffering

	function usage() {
		ob_start();
?>


more information - http://www.eec.ms/user_guide/mobile-device-detect/

<?php
		$buffer = ob_get_contents();

		ob_end_clean();

		return $buffer;
	}
	/* END */

}


class Client {

	public $agent;
	public $device;

	/**
	 * Available Mobile Clients
	 *  http://www.zytrax.com/tech/web/mobile_ids.html
	 *
	 * @var array
	 */
	protected $_mobileClients = array(
		"android" => array( "android" ),
		"blackberry" => array( "blackberry" ),
		"iphone4s" => array( "iphone", "ipod" ),
		"iphone" => array( "iphone", "ipod" ),
		"ipad" =>  array( "ipad" ),
		"kindlefire" => array( "silk" ),
		"opera" => array( "opera mini" ),
		"palm" => array( "vantgo", "blazer", "elaine", "hiptop", "palm", "plucker", "xiino" ),
		"windows" => array( "iemobile", "ppc", "smartphone" ),
		"mobile" => array( "android", "acer", "asus", "alcatel",  "blackberry", "htc",
			"hp", "lg", "motorola", "nokia", "palm", "samsung", "sonyericsson", "zte", "iphone",
			"ipod", "ipad", "mini", "playstation", "docomo", "benq", "vodafone", "sharp", "kindle",
			"nexus", "windows phone", "midp", "240x320", "netfront", "nokia", "panasonic",
			"portalmmm", "sie-", "silk", "symbian", "opera mini", "mda", "iemobile", "ppc", "vantgo",
			"blazer", "elaine", "hiptop", "palm", "plucker", "xiino", "smartphone", "mot-", "opera mini",
			"philips", "pocket pc", "sagem", "sda", "sgh-", "xda", "iphone", "mobile" )
	);


	public function isMobileClient( $userAgent ) {
		$userAgent = strtolower( $userAgent );

		foreach ( $this->_mobileClients as $device => $mobileClients ) {
			foreach ( $mobileClients as $mobileClient ) {

				if ( strstr( $userAgent, $mobileClient ) ) {
					return  $device;
				}
			}
		}

		return false;
	}

}

/* End of file pi.mobile_detect.php */
/* Location: ./system/expressionengine/third_party/mobile_detect/pi.mobile_detect.php */
