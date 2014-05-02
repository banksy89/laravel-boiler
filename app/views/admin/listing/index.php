<input type="hidden" id="js-table" value="<?php echo $table; ?>" />
<article class="grid__table">
	<div class="island">
		<p class="island__title island__filter">
			<span><?php echo ucfirst($table); ?> listing</span>
			<a href="/admin/<?php echo $table; ?>/edit" class="btn btn--add"><i class="fa fa-plus"></i> Add another</a>
			<a href="" class="btn btn--filter" id="js-filter"><i class="fa fa-filter"></i> Filter</a>
		</p>
		<dl class="filter" id="js-filter-container">
			<?php if (!!$columns_clean): ?>
				<?php foreach ($columns_clean as $column): ?>
					<dt><label><?php echo $column; ?></label></dt>
					<dd><input type="text" class="filter__input filter__input--small js-search-box" data-type="<?php echo strtolower(Helpers::clean_table( $column ) ); ?>" value="" /></dd>
				<?php endforeach; ?>
			<?php endif; ?>
			<dd class="filter__search">
				<button class="btn btn--search" id="js-reset"><i class="fa fa-search"></i> Reset</button>
				<button class="btn btn--search" id="js-action-filter"><i class="fa fa-search"></i> Search</button>
			</dd>
		</dl>
		<div class="island-content">

			<div id="js-message-to-user" class="grid__full"></div>

			<table cellpadding="0" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th width="5%">&nbsp;</th>
						<?php foreach ($columns_clean as $column) : ?>
							<th class="table__title">
								<?php echo $column; ?>
							</th>
						<?php endforeach; ?>
						<th width="10%">Actions</th>
					</tr>
				</thead>
				<tbody class="js-results-table">

					<?php if (!!$data) : ?>
						<?php foreach ($data as $item): ?>
							<tr id="js-item-<?php echo $item[ 'id' ]; ?>">
								<td><input type="checkbox" class="js-delete-checkbox" value="<?php echo $item[ 'id' ]; ?>"></td>

								<?php foreach ($columns as $column) : ?>
									<td><?php echo $item[ $column ]; ?></td>
								<?php endforeach; ?>

								<td>
									<a href="/admin/<?php echo $table; ?>/edit/<?php echo $item[ 'id' ]; ?>" class="table__icon-edit"><i class="fa fa-pencil"></i></a>
									<a href="" class="table__icon-delete js-delete" data-id="<?php echo $item[ 'id' ]; ?>"><i class="fa fa-trash-o"></i></a>
								</td>
							</tr>
						<?php endforeach; ?>
					<?php endif; ?>

				</tbody>
			</table>

			<p id="js-listing-error" class="alert alert--error hide"><i class="fa fa-exclamation"></i> There are no results to display <i class="fa fa-times js-fade-close alert__close"></i></p>

			<ul id="js-pagination-navigation" class="pagination"></ul>

			<p class="key">
				<!--
				<span class="key__completed">Completed</span>
				<span class="key__progress">In progress</span>
				<span class="key__notcompleted">Not yet completed</span>
				-->
				<a href="" class="btn btn--delete js-delete">Delete selected</a>
			</p>
		</div>
	</div>
</article>

<div class="overlay hide" id="js-delete-popup">
	<div class="overlay-container">
		<div class="overlay-content">
			<p>Are you sure that you want to delete?</p>
			<a href="" class="btn btn--save" id="js-action-delete">Yes</a>
			<a href="" class="btn btn--delete" id="js-close-popup">No</a>
		</div>
	</div>
</div>