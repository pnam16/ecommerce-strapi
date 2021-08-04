import React, { memo, useMemo } from "react";

import { LoadingIndicatorPage } from "strapi-helper-plugin";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../components/PageTitle";
import { useDashboard } from "../../hooks";

import {
  Block, Container, P, Separator,
} from "./components";

const fontSize = { fontSize: 20 };

const HomePage = () => {
  const {
    files,
    isLoading,
  } = useDashboard();

  const storageSize = useMemo(() => {
    let size = 0;

    files.forEach(file => {
      size += file.size;
      size += file.formats.thumbnail.size;
    });

    return Math.round(size) / 1000;
  }, [files]);

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {title => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-lg-10 col-md-12">
            <Block>
              <h2 id="mainHeader">Wellcome</h2>
              <Separator style={{ marginTop: 18, marginBottom: 18 }} />
              <P>Google analyze</P>
              <div className="row">
                <div className="col-lg-4 col-md-12">
                  <Block>
                    <P>User</P>
                    <div style={fontSize}>1234</div>
                  </Block>
                </div>
                <div className="col-lg-4 col-md-12">
                  <Block>
                    <P>New user</P>
                    <div style={fontSize}>10</div>
                  </Block>
                </div>
                <div className="col-lg-4 col-md-12">
                  <Block>
                    <P>Average engagement time</P>
                    <div style={fontSize}>5m26s</div>
                  </Block>
                </div>
              </div>
              <P>About your storage</P>
              <div className="row">
                <div className="col-lg-4 col-md-12">
                  <Block>
                    <P>Media files</P>
                    <div style={fontSize}>
                      {files.length}
                      {" "}
                      files
                    </div>
                  </Block>
                </div>
                <div className="col-lg-4 col-md-12">
                  <Block>
                    <P>Storage</P>
                    <div style={fontSize}>
                      {`${ storageSize } MB`}
                    </div>
                  </Block>
                </div>
              </div>
              <Separator style={{ marginTop: 18, marginBottom: 18 }} />
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
