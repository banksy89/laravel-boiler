<?php namespace Banksy\Repository;

interface InterfaceRepository {

    public function find($id);

    public function saveItem($id="", $data=array());

    public function create(array $data);

    public function update(array $data);

}

