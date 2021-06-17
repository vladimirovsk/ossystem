import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageIcon from '@material-ui/icons/Image';
import {makeStyles} from "@material-ui/core/styles";
import {fetchAllCategories} from "../../libs/databases"

import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    inputText: {
        padding: theme.spacing(1)

    },
    buttonDelete:{color: "red", margin: theme.spacing(2)},
    buttonSave:{color: "green", margin: theme.spacing(2), borderColor:"green"},
    buttonCancel:{color: "black",margin: theme.spacing(2)},

    title: {
        flexGrow: 1,
    },
    dialog:{
        width:'100vw',
        height: '100vh'
    }
}));

function FormCatalog(props){
    const classes = useStyles();
    const {openFormDialog, setOpenFormDialog, record, fetchData, newRecord} = props
    const [valueId, setValueId] = React.useState(0);
    const [valueTitle, setValueTitle] = React.useState('');
    const [valueDescription, setValueDescription] = React.useState('');
    const [valueCategory, setValueCategory] = React.useState('');
    const [valueImage, setValueImage] = React.useState('');
    const [titleDialog, setTitleDialog] = React.useState('EDIT')
    const [categories, setCategories] = React.useState([{id:0, name:""}])
    const [image, setImage] = useState("");
    const inputFile = useRef(null);

    React.useEffect(()=>{
        if (newRecord) {
            setTitleDialog("CREATE RECORD")
        }else {
            setTitleDialog("EDIT RECORD")
        }

        try {
            //refresh list categories
            handleFetchAllCategories(record.data.categoryId);

        }catch (e) {
            handleFetchAllCategories(undefined);

        }

        if (record!==undefined) {
            if(!newRecord) {
                setValueId(record.data.id)
                setValueTitle(record.data.title)
                setValueDescription(record.data.description)
                setValueCategory(record.data.category)
                setValueImage(record.data.image)
            }
        }else{
            setValueTitle("")
            setValueDescription("")
            console.log("record undefined", record)
        }

    },[record, newRecord])

    const handleSave = () =>{
        let body = {
            title: valueTitle,
            image: valueImage,
            category:valueCategory,
            description: valueDescription
        }
        if (newRecord){
            axios.post(`/api/v1/databases/catalog/`, body)
                .then(result => {
                    console.log("insert record", result)
                    setOpenFormDialog(false);
                    fetchData()
                })
                .catch(err => {
                    throw err
                })

        }else {
            axios.put(`/api/v1/databases/catalog/${valueId}`, body)
                .then(result => {
                    console.log("record saved", result)
                    setOpenFormDialog(false);
                    fetchData()
                })
                .catch(err => {
                    throw err
                })
        }
    }

    const handleDelete = () =>{
            axios.delete(`/api/v1/databases/catalog/${valueId}`)
            .then(result => {
                console.log("record deleted", result)
                fetchData()
                setOpenFormDialog(false);
            })
            .catch(err=>{throw err})
    }

    const handleClose = () => {
        setOpenFormDialog(false);
    }

    const handleChangeTitle= (event) => {
        setValueTitle(event.target.value);
    };

    const handleChangeCategory= (event) => {
        setValueCategory(event.target.value);
    };

    const handleChangeImage= (event) => {
        setValueImage(event.target.value);
    };

    const handleChangeDescription= (event) => {
        setValueDescription(event.target.value);
    };

    const handleUploadImage = (e) =>{
            const { file } = e.target;
            console.log(file)
            if (file && file.length) {
                const filename = file[0].name;
                let parts = filename.split(".");
                const fileType = parts[parts.length - 1];
                console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
                setImage(file[0]);
            }
    };

    async function handleFetchAllCategories(filter){
        const result  = await fetchAllCategories()
        setCategories(result)
        if (filter!==undefined) {
            setValueCategory(filter)
        }else{
            setValueCategory(result[0].id)
        }
    }

    return (
        <React.Fragment>
            <Dialog id="form-dialog-record-catalog"
                    className={classes.dialog}
                    open={openFormDialog}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">CATALOG: {titleDialog}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       ID:   : {valueId}
                    </DialogContentText>

                    <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        type="text"
                        variant="outlined"
                        className ={classes.inputText}
                        id="title"
                        label="TITTLE"
                        fullWidth
                        value= {valueTitle}
                        onChange={handleChangeTitle}
                    />
                    <TextField
                        type="text"
                        variant="outlined"
                        className={classes.inputText}
                        id="category"
                        label="CATEGORY"
                        fullWidth
                        select
                        SelectProps={{
                            native: true,
                        }}
                        value={valueCategory}
                        onChange={handleChangeCategory}
                    >
                        {categories.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>


                    <TextField
                        type="file"
                        ref={inputFile}
                        className={classes.inputText}
                        id="IMAGE_INPUT"
                        label="IMAGE"
                        fullWidth
                        variant="outlined"
                        value={valueImage}
                        onChange={handleChangeImage}
                        InputProps={{
                            endAdornment: (
                                <Button position="end" variant="outlined" onClick={handleUploadImage}>
                                    <ImageIcon />
                                </Button>
                            ),
                        }}
                    />
                    <TextField
                        type="text"
                        className={classes.inputText}
                        id="description"
                        label="DESCRIPTION"
                        fullWidth
                        variant="outlined"
                        value={valueDescription}
                        onChange={handleChangeDescription}
                    />
                   </form>
                 </DialogContent>
                 <DialogActions>
                     <Grid container alignItems="flex-start" justify="flex-start" direction="row">
                     <Button disabled={newRecord} className={classes.buttonDelete} variant="outlined" onClick={handleDelete} color="secondary">
                         Delete
                     </Button>
                     </Grid>
                     <Grid container alignItems="flex-end" justify="flex-end" direction="row">
                    <Button className={classes.buttonSave} variant="outlined" onClick={handleSave} color="secondary">
                         Save
                     </Button>
                     <Button className={classes.buttonCancel} variant="outlined" onClick={handleClose} color="primary">
                         Cancel
                     </Button>
                     </Grid>
                 </DialogActions>
             </Dialog>

        </React.Fragment>
    )
}

export default FormCatalog;