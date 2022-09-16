import React, { memo, useState } from 'react';

import Loader from 'src/components/components/Loader';
import { Field, Form, Formik, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ALERT_TYPE, ERRORS, INPUT_ERROS } from 'src/enums';
import Alert from './Alert';
interface IProps {
  onClose: () => void;
  submitCollection: (
    values: { name: string; description: string; imgFile: File | null },
    resetForm: Function
  ) => void;
  createCollectionState: { error: null | string; loading: boolean };
}

const CreateCollectionPopUp = (props: IProps) => {
  const [imgFile, setImgFile] = useState<null | File>(null);
  const { onClose, submitCollection, createCollectionState } = props;

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, INPUT_ERROS.tooShort)
      .max(50, INPUT_ERROS.tooLong)
      .required(INPUT_ERROS.requiredField),
    description: Yup.string()
      .min(2, INPUT_ERROS.tooShort)
      .max(250, INPUT_ERROS.tooLong)
      .required(INPUT_ERROS.requiredField)
  });

  const getInitialValue = () => {
    const result = {
      name: '',
      description: ''
    };
    return result;
  };

  const displayCreateCollectionForm = ({
    handleSubmit,
    values,
    submitCount,
    setValues,
    setFieldValue,
    errors,
    touched,
    handleChange,
    getFieldProps
  }: FormikProps<any>) => {
    const onChangeImage = (e: any) => {
      e.preventDefault();
      if (e.target.files.length === 0) {
        console.log(ERRORS.MISSING_IMAGE);
        return;
      }
      const file = e.target.files[0];
      setImgFile(file);
    };

    const getImage = () => {
      if (imgFile) {
        return URL.createObjectURL(imgFile);
      }
    };

    return (
      <Form onSubmit={handleSubmit}>
        <button className="btn-close" onClick={onClose}>
          x
        </button>
        <div className="heading">
          <h3>Create Collection</h3>
        </div>
        <div className="container">
          <div className="detailcheckout mt-4">
            <div className="listcheckout">
              <h6>Upload file</h6>
              <div className="row">
                <div className="d-create-file col">
                  <div className="browse">
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value="Browse"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      onChange={onChangeImage}
                    />
                  </div>
                </div>
                {getImage() && (
                  <div className="profile_avatar col">
                    <img src={getImage()} alt="collection" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="spacer-30"></div>

          {/*  */}
          <div className="detailcheckout mt-4">
            <div className="listcheckout">
              <h6>Name</h6>
              <Field
                type="text"
                name="name"
                id="item_name"
                className="form-control"
                placeholder={'Enter a collection name'}
              />
              <ErrorMessage name="name" />
            </div>
          </div>

          <div className="detailcheckout">
            <div className="listcheckout">
              <h6>Description</h6>
              <Field
                type="text"
                name="description"
                id="item_Description"
                className="form-control"
                placeholder={'Enter a collection description'}
              />
              <ErrorMessage name="description" />
            </div>
          </div>
          {/*  */}

          <div className="spacer-20"></div>

          {createCollectionState.loading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              id="submit"
              className="btn-main"
              value="Create Collection"
            />
          )}
          <div className="spacer-20"></div>
          {createCollectionState.error && (
            <Alert
              text={createCollectionState.error}
              type={ALERT_TYPE.DANGER}
            />
          )}
        </div>
      </Form>
    );
  };

  return (
    <div className="maincheckout">
      <Formik
        initialValues={getInitialValue()}
        onSubmit={(values, actions) => {
          submitCollection({ ...values, imgFile }, actions.resetForm);
        }}
        render={displayCreateCollectionForm}
        validationSchema={SignupSchema}
      />
    </div>
  );
};

export default memo(CreateCollectionPopUp);
