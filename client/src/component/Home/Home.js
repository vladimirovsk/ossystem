import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {DataGrid} from '@material-ui/data-grid'
import FormCatalog from '../FormCatalog/FormCatalog'
import Header from '../Header/Header'
import {fetchCatalog} from "../../libs/databases";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import './Home.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '90VH',
        width: '100%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        right: 30,
        bottom: 30,
        margin: '0 auto',
    },
}));

/**
 * Column from grid
 */
const columns = [
    { field: 'id', headerName: 'ID', width: 250, hide:true },
    { field: 'title', headerName: 'TITLE', width: 250 },
    { field: 'description', headerName: 'DESCRIPTION', width: 250 },
    { field: 'image', headerName: 'IMAGE', width: 250 },
    { field: 'categoryName', headerName: 'CATEGORY NAME' , width: 250},
    { field: 'categoryId', headerName: 'CATEGORY ID' , width: 250, hide:true},
    { field: "__v", hide:true }
];

function Home(props) {
    const classes = useStyles();
    const [record, setRecord] = React.useState();
    const [openFormDialog, setOpenFormDialog] = React.useState(false);
    const [rowData, setRowData] = React.useState([])
    const [newRecord, setStatusNewRecord] = React.useState(false)
    const [filter, setFilter] = React.useState('')

    async function fetchData(filter) {
        const result =  await fetchCatalog(filter)
        setRowData(result)
    }

    /**
     * Open DialogForm and set record an
     * setStatus record = edit record
     */
    const handleClickOpen = () =>{
        setRecord(record);
        setStatusNewRecord(false)
        setOpenFormDialog(true);
    }
    /**
     * Open DialogForm and set record an
     * setStatus record = new record
     */
    const handleClickNewRecord = () =>{
        setRecord(record);
        setStatusNewRecord(true)
        setOpenFormDialog(true);
    }

    /**
     * Refresh DbGrid >  filter
      */
    React.useEffect( () => {
        fetchData(filter)
    }, [filter]);

     return (
       <React.Fragment >
       <Header setFilter={setFilter} />
           <div>
           <DataGrid
                id={Math.random()}
                pageSize={30}
                rowHeight={40}
                autoHeight={true}
                onRowSelected={record=>{
                    setRecord(record)
                }}
                onRowDoubleClick={handleClickOpen}
                rows={rowData}
                columns={columns}
            />
               <AppBar position="fixed" color="primary" className={classes.appBar}>
                   <Toolbar>
                       <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handleClickNewRecord}>
                           <AddIcon />
                       </Fab>
                   </Toolbar>
               </AppBar>
           </div>
        <FormCatalog openFormDialog={openFormDialog}
                     setOpenFormDialog={setOpenFormDialog}
                     record={record}
                     setRowData={setRowData}
                     fetchData={fetchData}
                     newRecord = {newRecord}
        />

       </React.Fragment>
    );

}

export default Home