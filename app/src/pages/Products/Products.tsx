import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

import { loadRequest as loadProducts } from '../../store/ducks/product/actions';
import { updateRequest as updateProduct } from '../../store/ducks/product/actions';
import { removeRequest as removeProduct } from '../../store/ducks/product/actions';
import { createRequest as addProduct } from '../../store/ducks/product/actions'

import { AppState } from '../../store';

import { DataTable, DataTableValueArray , DataTableRowClickEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { format } from "date-fns";

const Products = () => {

    const dispatch = useDispatch();
    
    const [show_dialog,setShowDialog] = useState(false);
    const [show_add_dialog,setShowAddDialog] = useState(false);

    useEffect(() => {
      dispatch(loadProducts('all'));
    }, [dispatch,show_dialog,show_add_dialog]);   

    const products = useSelector((state: AppState) => state.product.data);
    const loading = useSelector((state: AppState) => state.product.loading);
    const error = useSelector((state: AppState) => state.product.error);
    const errMsg = useSelector((state: AppState) => state.product.errMsg);
        
    const [modal_err_msg, setModalErr] = useState<any>({visible: "hidden", msg: ""});
    const [dialog_data, setDialogData] = useState<any>({});
    const [add_dialog_data, setAddDialogData] = useState<any>({});

    
    function onInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) {
      const { value } = event.target;
      setDialogData((prevState: any) => ({
        ...prevState,
        [key]: value
      }));
    }

    function onClickHandle(event: DataTableRowClickEvent) : void{
      setDialogData(event.data);
      setShowDialog(true);
    }

    function onProductEdit() : void{
      dispatch(updateProduct(dialog_data.id, {...dialog_data}));

      if(!error){
        setShowDialog(false);
        setModalErr({msg: "", visible: "hidden"})
      }
      else{
        setModalErr({msg: errMsg, visible: ""})
        setShowDialog(true);
      }

    }

    function onProductDelete() : void{
        dispatch(removeProduct(dialog_data.id));
        if(!error){
          setShowDialog(false);
          setModalErr({msg: "", visible: "hidden"})
        }
        else{
          setModalErr({msg: errMsg, visible: ""})
          setShowDialog(true);
        }
    }

    function AddProductSubmit(){
      dispatch(addProduct(add_dialog_data));
      if(!error){
        setShowAddDialog(false);
        setModalErr({msg: "", visible: "hidden"});
      }
      else{
        setModalErr({msg: errMsg, visible: ""})
        setShowAddDialog(true);
      }
    }
    

    return(
      <>
        <div className='page-heading'><h1>Products</h1><br /></div>
        <Button label="Add" severity="success" onClick={()=>setShowAddDialog(true)}/>
        <DataTable loading={loading} value={Object.values(products)} tableStyle={{ minWidth: '50rem' }} 
        onRowClick={onClickHandle}>
          <Column field="id" header="ID"></Column>
          <Column filter={true}  field="name" header="Product name"></Column>
        </DataTable>

        <Dialog header="Edit Product" className="edit-product" visible={show_dialog} style={{ width: '50vw' }} onHide={() => setShowDialog(false)}>
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Product name</span>
            <InputTextarea style={{ height: '50px' }} placeholder="Product name" value={dialog_data.name}
            onChange={(e) => onInputChange(e, 'name')} />
          </div>

          <Button label="Submit" severity="success" onClick = {() => onProductEdit()} />
          <Button label="Delete" severity="danger"  onClick = {() => onProductDelete()} className="float-right"/>
      </Dialog>



      <Dialog header="Add Product" className="add-product" visible={show_add_dialog} style={{ width: '50vw' }} onHide={() => {setShowAddDialog(false);setAddDialogData({}) }}>
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Product name</span>
            <InputText placeholder="Product name" onChange={(e)=>setAddDialogData({...add_dialog_data, name: e.target.value})}/>
          </div>

          <Button label="Submit" severity="success" onClick = {() => AddProductSubmit()} />
      </Dialog>

      </>
    );
  
}

export default Products;