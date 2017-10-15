import * as React from "react";

import { Card } from "../../components/card";
import { GaugeChart } from "../../components/gauge-chart";

const styles: any = require("./dashboard.view.css");

export class DashboardView extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return (
            <div className={styles.dashboardContainer}>
                <h1>RaspHome</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-3 col-xl-2">
                            <Card heading="Memory usage">
                                <GaugeChart min={0} max={1024} value={582} warningLevel={770} errorLevel={900} valueTextBuilder={(value) => `${value} mb`} />
                            </Card>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-3 col-xl-2">
                            <Card heading="Storage">
                                <GaugeChart min={0} max={32} value={6.02} warningLevel={24} errorLevel={29} valueTextBuilder={(value) => `${value.toFixed(2)} gb`} />
                            </Card>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-3 col-xl-2">
                            <Card heading="CPU load">
                                <GaugeChart min={0} max={100} value={70.01} warningLevel={70} errorLevel={95} valueTextBuilder={(value => `${value.toFixed(2)} %`)} />
                            </Card>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-3 col-xl-2">
                            <Card heading="CPU temp">
                                <GaugeChart min={30} max={80} value={76.1} warningLevel={60} errorLevel={75} valueTextBuilder={(value) => `${value.toFixed(2)} C`} />
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}