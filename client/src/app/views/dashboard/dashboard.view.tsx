import * as React from "react";

import { Card } from "../../components/card";
import { GaugeChart } from "../../components/gauge-chart";
import { GridContainer, GridRow, GridCol } from "../../components/grid";

import { List, ListItem } from "../../components/list";
import { ToggleSwitch } from "../../components/toggle-switch";

const styles: any = require("./dashboard.view.css");

export class DashboardView extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return (
            <div className={styles.dashboardContainer}>

                <GridContainer>
                    <GridRow verticalMiddle={true}>
                        <GridCol xl={3} lg={3} md={6} sm={6}>
                            <Card heading="Lamps">
                                <List>
                                    <ListItem>
                                        <div style={{ "display": "flex", "align-items": "center" }}>
                                            <div style={{ "flex": 2 }}>Bedroom table lamp</div>
                                            <div style={{ "flex": 1, "text-align": "right" }}><ToggleSwitch /></div>
                                        </div>
                                    </ListItem>
                                    <ListItem>
                                        <div style={{ "display": "flex", "align-items": "center" }}>
                                            <div style={{ "flex": 2 }}>Kitchen main</div>
                                            <div style={{ "flex": 1, "text-align": "right" }}><ToggleSwitch /></div>
                                        </div>
                                    </ListItem>
                                    <ListItem>
                                        <div style={{ "display": "flex", "align-items": "center" }}>
                                            <div style={{ "flex": 2 }}>Living room table lamp</div>
                                            <div style={{ "flex": 1, "text-align": "right" }}><ToggleSwitch /></div>
                                        </div>
                                    </ListItem>
                                </List>
                            </Card>
                        </GridCol>
                    </GridRow>
                </GridContainer>

                <GridContainer>
                    <GridRow verticalMiddle={true}>
                        <GridCol xl={4}>
                            <h1>RaspHome</h1>
                        </GridCol>
                        <GridCol lg={3} xl={2} md={6} sm={6}>
                            <Card heading="Memory usage">
                                <GaugeChart min={0} max={1024} value={582} warningLevel={770} errorLevel={900} valueTextBuilder={(value) => `${value}`} unitText="mb" />
                            </Card>
                        </GridCol>
                        <GridCol lg={3} xl={2} md={6} sm={6}>
                            <Card heading="Storage">
                                <GaugeChart min={0} max={32} value={6.02} warningLevel={24} errorLevel={29} valueTextBuilder={(value) => `${value.toFixed(2)}`} unitText="gb" />
                            </Card>
                        </GridCol>
                        <GridCol lg={3} xl={2} md={6} sm={6}>
                            <Card heading="CPU load">
                                <GaugeChart min={0} max={100} value={70.01} warningLevel={70} errorLevel={95} valueTextBuilder={(value => `${value.toFixed(2)}`)} unitText="%" />
                            </Card>
                        </GridCol>
                        <GridCol lg={3} xl={2} md={6} sm={6}>
                            <Card heading="CPU temp">
                                <GaugeChart min={30} max={80} value={76.1} warningLevel={60} errorLevel={75} valueTextBuilder={(value) => `${value.toFixed(2)}`} unitText="'C" />
                            </Card>
                        </GridCol>

                    </GridRow>
                </GridContainer>
            </div>
        )
    }

}