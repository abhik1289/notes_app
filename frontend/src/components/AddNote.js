import Header from "./Haeder";
import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

function AddNote() {
    const location = useLocation();
    let editMode = false;
    let getData;


    try {
        editMode = location.state.editMode;
        getData = location.state.data;
        if (getData != null) {

        }
    } catch (error) {
        console.log(error)
    }
    const initialValues = {
        title: editMode ? getData.title : "",
        notes: editMode ? getData.notes : "",
    }
    let id, enotes, etitle;
    const EditsubmitFrm = async (values) => {
        id = editMode ? getData._id : null;
        enotes = values.notes;
        etitle = values.title;
        try {
            title = values.title;
            notes = values.notes;
            const res = await fetch("/updateNotes", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ etitle, enotes, id })
            });
            if (res.status === 200) {
                toast("Note Update");
            } else {
                toast("Note not Update");

            }
        } catch (error) {
            console.log(error)
        }
    }
    let title, notes;
    const submitFrm = async (values) => {
        try {
            title = values.title;
            notes = values.notes;
            const res = await fetch("/saveNotes", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title, notes })
            });
            if (res.status === 200) {
                toast("Note saved");
            } else {
                toast("Note not saved")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const validationShema = Yup.object({
        title: Yup.string().min(3).max(80).required(),
        notes: Yup.string().min(5).max(500).required(),
    });
   
    
    return (<>
        <Header />
        <section className="pt-28">
            <div className="main w-5/6 mx-auto">
                <div className="forBX md:w-8/12 w-full">
                    {
                        editMode ? <Formik
                            initialValues={initialValues}
                            onSubmit={EditsubmitFrm}
                            validationSchema={validationShema}
                        >
                            <Form>
                                <div className="formClm font-main py-2">
                                    <label>
                                        Note Title
                                    </label>
                                    <Field  name="title" type="text" className="w-full border border-blue-200 focus:border-blue-400 outline-none py-1 px-4" />
                                    <ErrorMessage name="title"/>
                                </div>
                                <div className="formClm font-main py-2">
                                    <label>
                                        Notes
                                    </label>
                                    <Field as="textarea" name="notes" className="w-full border border-blue-200 focus:border-blue-400 outline-none py-1 px-4" id="" cols="30" rows="10"></Field>
                                    <ErrorMessage name="notes"/>
                                </div>
                                <button type="submit" className="px-5 py-1 font-main text-white bg-sky-500">Add Note</button>
                                <ToastContainer
                                    position="bottom-left"
                                    autoClose={2000}
                                    hideProgressBar={true}
                                    newestOnTop={false}
                                    closeOnClick={false}
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                />
                            </Form>
                        </Formik> : <Formik
                            initialValues={initialValues}
                            onSubmit={submitFrm}
                            validationSchema={validationShema}
                        >
                            <Form>
                                <div className="formClm font-main py-2">
                                    <label>
                                        Note Title
                                    </label>
                                    <Field name="title" id="letterCounting" type="text" className="w-full border border-blue-200 focus:border-blue-400 outline-none py-1 px-4" />
                                    <div className="error text text-red-400">
                                       <ErrorMessage name="title"/>
                                    </div>
                                </div>
                                <div className="formClm font-main py-2">
                                    <label>
                                        Notes
                                    </label>
                                    <Field as="textarea" name="notes" className="w-full border border-blue-200 focus:border-blue-400 outline-none py-1 px-4" id="" cols="30" rows="10"></Field>
                                    <div className="error text text-red-400">
                                       <ErrorMessage name="notes"/>
                                    </div>
                                </div>
                                <button type="submit" className="px-5 py-1 font-main text-white bg-sky-500">Add Note</button>
                                <ToastContainer
                                    position="bottom-left"
                                    autoClose={2000}
                                    hideProgressBar={true}
                                    newestOnTop={false}
                                    closeOnClick={false}
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                />
                            </Form>
                        </Formik>
                    }

                </div>
            </div>
        </section>
    </>);
}

export default AddNote;