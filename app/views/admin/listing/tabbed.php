<input type="hidden" id="js-table" value="<?php echo $table; ?>" />
<article class="grid__full">
	<div class="island">
		<p class="island__title island__filter">
			<span><?php echo(ucfirst($table)); ?>s</span>

			<?php if( $table != 'order' ) : ?>
				<a href="/admin/product/edit" class="btn btn--add"><i class="fa fa-plus"></i> Add another</a>
			<?php endif; ?>

			<a href="" class="btn btn--filter" id="js-filter" data-area="filter"><i class="fa fa-filter"></i> Filter</a>
		</p>
		<dl class="filter" id="js-filter-container">
			<?php if( !!$columns_clean ) : ?>
				<?php foreach( $columns_clean as $column ) : ?>
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

			<div id="js-message-to-user"></div>

			<ul class="tabs">
				<li class="js-tab tabs__item" data-id="1"><?php echo( $table == 'product' ? 'Currently listed' : 'Pending' ); ?></li>
				<li class="js-tab tabs__item" data-id="2"><?php echo( $table == 'product' ? 'Sold' : 'Processing' ); ?></li>
				<li class="js-tab tabs__item" data-id="3"><?php echo( $table == 'product' ? 'Removed' : 'Completed' ); ?></li>
			</ul>
			<div class="js-tab-content tabs-content" id="tab-1">
				<table cellpadding="0" cellspacing="0" width="100%" class="table">
					<thead>
						<tr>
							<th width="5%">&nbsp;</th>

							<?php foreach( $columns as $column ) : ?> 
								<th class="table__title">
									<?php echo ucwords( str_replace( '_', ' ', $column ) ); ?>
									<?php echo( $column == 'create_date' && $table == 'order' ? '<a href="#" class="js-order-by fa fa-sort-asc order-by" data-order="asc" data-column="' . $column . '"></a>' : '' ); ?>
								</th>
							<?php endforeach; ?>

							<th width="10%">Actions</th>
						</tr>
					</thead>
					<tbody id="js-pending" class="js-results-table">
						<?php foreach( $data as $result ) : ?>
							<?php if( $result[ 'status' ] == ( $table == 'order' ? 1 : 0 ) ) : ?>
								<tr id="js-item-<?php echo $result[ 'id' ]; ?>">
									<td><input type="checkbox" class="js-delete-checkbox" value="<?php echo $result[ 'id' ]; ?>"></td>

									<?php foreach( $columns as $column ) : ?>
										<?php if( $column == 'create_date' ) : ?>
											<td class="table__title"><?php echo long_date( $result[ $column ] ); ?></td>
										<?php elseif( $column == 'image' ) : ?>
											<td class="table__img">
												<?php if( !!$result[ $column ][ 0 ][ 'imgname' ] ) : ?>
													<img src="/_admin/assets/uploads/images/90-90/<?php echo $result[ $column ][ 0 ][ 'imgname' ]; ?>" />
												<?php endif; ?>
											</td>
										<?php else : ?>
											<td class="table__title"><?php echo $result[ $column ]; ?></td>
										<?php endif; ?>
									<?php endforeach; ?>

									<td>
										<a href="/admin/<?php echo $table; ?>/edit/<?php echo $result[ 'id' ]; ?>" class="table__icon-edit"><i class="fa fa-pencil"></i></a>
										<a href="" class="table__icon-delete js-delete" data-id="<?php echo $result[ 'id' ]; ?>"><i class="fa fa-trash-o"></i></a>
									</td>
								</tr>
							<?php endif; ?>
						<?php endforeach; ?>
					</tbody>
				</table>

				<ul id="js-pending-pagination" class="pagination" data-area="tabs_one"></ul>

				<p class="key">
					<a href="" class="btn btn--delete js-delete">Delete selected</a>
				</p>
			</div>

			<!-- Awaiting action -->
			<div class="js-tab-content tabs-content" id="tab-2">
				<table cellpadding="0" cellspacing="0" width="100%" class="table">
					<thead>
						<tr>
							<th width="5%">&nbsp;</th>

							<?php foreach( $columns as $column ) : ?> 
								<th width="15%" class="table__title">
									<?php echo ucwords( str_replace( '_', ' ', $column ) ); ?>
									<?php echo( $column == 'create_date' && $table == 'order' ? '<a href="#" class="js-order-by fa fa-sort-asc order-by" data-order="asc" data-column="' . $column . '">Asc</a>' : '' ); ?>
								</th>
							<?php endforeach; ?>

							<th width="10%">&nbsp;</th>
						</tr>
					</thead>
					<tbody id="js-pending" class="js-results-table">
						<?php foreach( $data as $result ) : ?>
							<?php if( $result[ 'status' ] == ( $table == 'order' ? 2 : 1 ) ) : ?>
								<tr id="js-item-<?php echo $result[ 'id' ]; ?>">
									<td><input type="checkbox" class="js-delete-checkbox" value="<?php echo $result[ 'id' ]; ?>"></td>

									<?php foreach( $columns as $column ) : ?>
										<?php if( $column == 'create_date' ) : ?>
											<td class="table__title"><?php echo long_date( $result[ $column ] ); ?></td>
										<?php elseif( $column == 'image' ) : ?>
											<td class="table__img">
												<?php if( !!$result[ $column ][ 0 ][ 'imgname' ] ) : ?>
													<img src="/_admin/assets/uploads/images/90-90/<?php echo $result[ $column ][ 0 ][ 'imgname' ]; ?>" />
												<?php endif; ?>
											</td>
										<?php else : ?>
											<td class="table__title"><?php echo $result[ $column ]; ?></td>
										<?php endif; ?>
									<?php endforeach; ?>

									<td>
										<a href="/admin/<?php echo $table; ?>/edit/<?php echo $result[ 'id' ]; ?>" class="table__icon-edit"><i class="fa fa-pencil"></i></a>
										<a href="" class="table__icon-delete js-delete" data-id="<?php echo $result[ 'id' ]; ?>"><i class="fa fa-trash-o"></i></a>
									</td>
								</tr>
							<?php endif; ?>
						<?php endforeach; ?>
					</tbody>
				</table>

				<ul id="js-awaiting-action-pagination" class="pagination" data-area="tabs_two"></ul>

				<p class="key">
					<a href="" class="btn btn--delete js-delete">Delete selected</a>
				</p>
			</div>
			<div class="js-tab-content tabs-content" id="tab-3">
				<table cellpadding="0" cellspacing="0" width="100%" class="table">
					<thead>
						<tr>
							<th width="5%">&nbsp;</th>

							<?php foreach( $columns as $column ) : ?> 
								<th width="15%" class="table__title">
									<?php echo ucwords( str_replace( '_', ' ', $column ) ); ?>
									<?php echo( $column == 'create_date' && $table == 'order' ? '<a href="#" class="js-order-by fa fa-sort-asc order-by" data-order="asc" data-column="' . $column . '">Asc</a>' : '' ); ?>
								</th>
							<?php endforeach; ?>

							<th width="10%">&nbsp;</th>
						</tr>
					</thead>
					<tbody id="js-pending" class="js-results-table">
						<?php foreach( $data as $result ) : ?>
							<?php if( $result[ 'status' ] == ( $table == 'order' ? 3 : 2 ) ) : ?>
								<tr id="js-item-<?php echo $result[ 'id' ]; ?>">
									<td><input type="checkbox" class="js-delete-checkbox" value="<?php echo $result[ 'id' ]; ?>"></td>

									<?php foreach( $columns as $column ) : ?>
										<?php if( $column == 'create_date' ) : ?>
											<td class="table__title"><?php echo long_date( $result[ $column ] ); ?></td>
										<?php elseif( $column == 'image' ) : ?>
											<td class="table__img">
												<?php if( !!$result[ $column ][ 0 ][ 'imgname' ] ) : ?>
													<img src="/_admin/assets/uploads/images/90-90/<?php echo $result[ $column ][ 0 ][ 'imgname' ]; ?>" />
												<?php endif; ?>
											</td>
										<?php else : ?>
											<td class="table__title"><?php echo $result[ $column ]; ?></td>
										<?php endif; ?>
									<?php endforeach; ?>

									<td>
										<a href="/admin/<?php echo $table; ?>/edit/<?php echo $result[ 'id' ]; ?>" class="table__icon-edit"><i class="fa fa-pencil"></i></a>
										<a href="" class="table__icon-delete js-delete" data-id="<?php echo $result[ 'id' ]; ?>"><i class="fa fa-trash-o"></i></a>
									</td>
								</tr>
							<?php endif; ?>
						<?php endforeach; ?>
					</tbody>
				</table>

				<ul id="js-completed-pagination" class="pagination" data-area="tabs_three"></ul>

				<p class="key">
					<a href="" class="btn btn--delete js-delete">Delete selected</a>
				</p>
			</div>
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