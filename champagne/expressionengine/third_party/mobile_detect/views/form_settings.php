<?php if ( $settings_form ) : ?>
<?php echo form_open(
		'C=addons_extensions&M=extension_settings&file=mobile_detect',
		'',
		array( "file" => "mobile_detect" )
	)
?>
<table class="mainTable padTable"  border="0" cellpadding="0" cellspacing="0">
<tbody>
<tr>
<th><?php echo lang( 'witdh' )?></th>
<th><?php echo lang( 'height' )?></th>
<th><?php echo lang( 'pixel_ratio' )?></th>
<th><?php echo lang( 'value' )?></th>
<th><?php echo lang( 'name' )?></th>
<th><?php echo lang( 'disable' )?></th>
<th style="width:70px"><?php echo lang( '' )?></th>
</tr>
</tbody> <?php endif; ?>
<tbody id="cond_table">

<?php

if ( ! function_exists( 'print_var' ) ) {
	function print_var( $var, $row, $index, $default = '' ) {
		return ( isset( $var[$row][$index] ) ) ? $var[$row][$index] : $default;
	}
}

$out = '';

if ( isset ( $settings['row_order'] ) && count( $settings['row_order'] ) > 0 ) {
	$settings['row_order'][] = max( $settings['row_order'] ) + 1;

} else {

	$settings['row_order'] = array ( '1' => '1' );
}

$pre_cond = array(
	'='   => '=',
	'>'  => '>',
	'<'    => '<',
	'!='   => '!=',
);

foreach ( $settings['row_order'] as $row_order => $row_id ) {
	$out .= '<tr>';
	$out .= '<td class="dnd">'.form_dropdown( $input_prefix . '[' . $row_id . '][pre_width]', $pre_cond, print_var( $settings, $row_id, 'pre_width' , '=' ) );

	$out .= form_input( array( 'name'=> $input_prefix . '['.$row_id.'][width]', 'value' => print_var( $settings, $row_id, 'width' ), 'style'       => 'width: 50px;margin-left:10px;' ) ).'';

	$out .= form_hidden( $input_prefix . '[row_order][]', $row_id ).'</td>';

	$out .= '<td>'.form_dropdown( $input_prefix . '[' . $row_id . '][pre_height]', $pre_cond, print_var( $settings, $row_id, 'pre_height', '=' ) );

	$out .= form_input( array( 'name'=>  $input_prefix . '[' . $row_id . '][height]', 'value' => print_var( $settings, $row_id, 'height' ), 'style'       => 'width: 50px;margin-left:10px;' ) ).'</td>';

	$out .= '<td>'.form_dropdown( $input_prefix . '[' . $row_id . '][pre_pix_ratio]', $pre_cond, print_var( $settings, $row_id, 'pre_pix_ratio', '=' ) );

	$out .= form_input( array( 'name'=>  $input_prefix . '[' . $row_id . '][pix_ratio]', 'value' => print_var( $settings, $row_id, 'pix_ratio' ), 'style'       => 'width: 50px;margin-left:10px;' ) ).'</td>';

	$out .= '<td>'.form_input( array( 'name'=>  $input_prefix . '[' . $row_id . '][value]', 'value' => print_var( $settings, $row_id, 'value' ), 'style'       => 'width: 80px;' ) ).'</td>';

	$out .= '<td>'.form_input( array( 'name'=>  $input_prefix . '[' . $row_id . '][name]', 'value' => print_var( $settings, $row_id, 'name' ), 'style'       => 'width: 80px;' ) ).'</td>';

	//$out .= '<td>'.form_input( array( 'name'=>  $input_prefix . '[' . $row_id . '][redirect]', 'value' => print_var( $settings, $row_id, 'redirect' ), 'style' => 'width: 95%;' ) ).'</td>';

	$out .= '<td>'.form_checkbox( $input_prefix . '[' . $row_id . '][disable]', 'on', print_var( $settings, $row_id, 'disable', FALSE ) ).'</td>';

	$out .= '<td style="text-align:center;"><a href="#" class="plus"> </a> <a href="#" class="minus l-b0"> </a></td>';
	$out .= '</tr>';

}

print $out;

?>
</tbody></table>
<p class="centerSubmit"><input name="edit_screen_size" value="<?php echo lang( 'save_extension_settings' ); ?>" class="submit" type="submit" data-row-max="<?php echo $row_id?>"></p>
<?php echo form_close(); ?>

<style>
	.plus {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAGUlEQVQImWNggIANQIgC8AlsQIOYAiQbCgAUMxNBUqWR0wAAAABJRU5ErkJggg==)}
	.minus {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAEklEQVQIW2NgIANsQIOYAiQDAOcmCwGcy16yAAAAAElFTkSuQmCC)}
	.plus, .minus{width:25px; height:15px; border:1px solid #b5b5b5; display:block;float:left;background-repeat: no-repeat;background-position: center}
	.l-b0 {border-left:0px;}
	.dnd {}
</style>

<script language="javascript">
	var fixHelper = function(e, ui) {
		ui.children().each(function() {
			$(this).width($(this).width());
		});
		return ui;
	};
	$(function() {
		$( "#cond_table" ).sortable({  helper: fixHelper});
		$( ".minus").live("click", function(e) {
			e.preventDefault();
			$(this).parents("tr:first").remove();
		});
		$( ".plus").live("click", function(e) {
			e.preventDefault();
			var $obj = $(this).parents("tr:first").clone();
			var id = $('[name="edit_screen_size"]').data("row-max") + 1;
			var reg_ = /<?php echo $input_prefix?>\[([0-9])\]/;
			$('[name="edit_screen_size"]').data("row-max", id);
			$obj.find("*[name]").andSelf().each(function(){$(this).attr("name", function(i, name){
				return (name+"").replace (reg_, "<?php echo $input_prefix?>[" + id +"]");})});
			$obj.find("[name='<?php echo $input_prefix?>\[row_order\]\[\]']").val(id);
			$obj.insertAfter($(this).parents("tr:first"));
		});
	});
</script>
