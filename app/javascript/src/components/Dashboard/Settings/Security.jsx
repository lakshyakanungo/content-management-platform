import React, { useState } from "react";

import { Switch } from "@bigbinary/neetoui";
import classNames from "classnames";
import { Check, Close, Eye } from "neetoicons";
import { Form, Input, Button } from "neetoui/formik";
import * as yup from "yup";

import Layout from "./Layout";

const Security = () => {
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAtleastSixCharactarsLong, setIsAtleastSixCharactarsLong] =
    useState(false);

  const [hasAtleastOneLetterAndSymbol, setHasAtleastOneLetterAndSymbol] =
    useState(false);

  const buildValidationClassName = validation =>
    classNames({
      "flex gap-2 items-center text-xs my-2": true,
      "neeto-ui-text-gray-500": !validation,
      "neeto-ui-text-success-500": validation,
    });

  const handleChange = event => {
    const value = event.target.value;
    const regex = /(?=.*[A-Za-z])(?=.*\W)/;
    if (value.length >= 6) setIsAtleastSixCharactarsLong(true);
    else setIsAtleastSixCharactarsLong(false);

    if (value.match(regex)) setHasAtleastOneLetterAndSymbol(true);
    else setHasAtleastOneLetterAndSymbol(false);
    setPassword(value);
  };

  return (
    <Layout
      description="Configure security related settings for your site."
      header="Security"
    >
      <div className="flex justify-between">
        <span>Password protect your site</span>
        <Switch
          checked={isPasswordRequired}
          onChange={() => setIsPasswordRequired(!isPasswordRequired)}
        />
      </div>
      {isPasswordRequired && (
        <Form
          formikProps={{
            initialValues: {
              password: "",
            },
            validationSchema: yup.object().shape({
              password: yup.string().required("Required"),
            }),
          }}
        >
          {props => {
            // console.log(props);
            props;

            return (
              <>
                <Input
                  className="mb-4"
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  suffix={<Eye />}
                  type="password"
                  value={password}
                  onChange={handleChange}
                />
                <div
                  className={buildValidationClassName(
                    isAtleastSixCharactarsLong
                  )}
                >
                  <span>
                    {isAtleastSixCharactarsLong ? (
                      <Check size={16} />
                    ) : (
                      <Close size={16} />
                    )}
                  </span>
                  <span>Have at least 6 characters</span>
                </div>
                <div
                  className={buildValidationClassName(
                    hasAtleastOneLetterAndSymbol
                  )}
                >
                  <span>
                    {hasAtleastOneLetterAndSymbol ? (
                      <Check size={16} />
                    ) : (
                      <Close size={16} />
                    )}
                  </span>
                  <span>Include at least 1 letter and 1 number</span>
                </div>
                <Button label="Save changes" type="submit" />
                <Button label="Cancel" style="text" type="reset" />
              </>
            );
          }}
        </Form>
      )}
    </Layout>
  );
};

export default Security;
