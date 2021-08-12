import React, { Component } from 'react';
import PlanningService from '../services/PlanningService';
import CahierService from '../services/CahierService';

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import jsPDF from "jspdf";
import "jspdf-autotable";

class ListPlanningComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            titre: '',
            startTime: '',
            plannings: [],
            direction: 'asc',
            sortby: "",
            cahier: null,
            resData: null
        }
        this.addPlanning = this.addPlanning.bind(this);
        this.editPlanning = this.editPlanning.bind(this);
        this.deletePlanning = this.deletePlanning.bind(this);
        this.sortByHandler = this.sortByHandler.bind(this)
    }

    componentDidMount() {
        PlanningService.getPlannings().then((res) => {

            this.setState({ plannings: res.data })
        })

        this.sortTableHandler('id')

        //console.log(this.state.plannings.id   );

    }


    addPlanning() {
        this.props.history.push('/AddPlanning/0');
    }

    editPlanning(id) {
        this.props.history.push(`/AddPlanning/${id}`);
    }

    expoterPlanning(id) {
        PlanningService.exportPlanning(id).then(res => {
            PlanningService.getPlannings().then((res) => {

                this.setState({ plannings: res.data })
            })
        })
        // this.props.history.push(`/ExportPlanning/${id}`);
    }

    deletePlanning(id) {
        PlanningService.deletePlanning(id).then(res => {
            this.setState({ plannings: this.state.plannings.filter(planning => planning.id !== id) });
        })
    }
    viewPlanning(id) {
        this.props.history.push(`/ViewPlanning/${id}`);

    }

    sortByHandler(key, data) {
        return {
            seances: [].concat(data.seances)
                .sort((a, b) => (a[key] > b[key] ? 1 : -1)),
            id: data.id,
            startTime: data.startTime,
            titre: data.titre,
        }
    }

    sortTableHandler = (key) => {
        this.setState({
            plannings: [].concat(this.state.plannings)
                .sort((a, b) => this.state.direction === 'asc'
                    ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1),
            direction:
                this.state.direction === 'asc'
                    ? 'desc'
                    : 'asc',

            sortby: key
        },
        )
    }
    //////generat fuction
    exportPDF = (id, indice) => {
        PlanningService.getPlanningById(id).then((res) => {
            this.setState({ resData: res.data })

            CahierService.getCahierByPlanning(res.data).then((res) => {
                if (res.data.length > 0) {
                    this.setState({ cahier: res.data[0] })
                }
            }).then(() => {
                var resData = this.state.resData
                var cahier = this.state.cahier

                const unit = "pt";
                const size = "A4"; // Use A1, A2, A3 or A4
                const orientation = "portrait"; // portrait or landscape

                const marginLeft = 40;
                const doc = new jsPDF(orientation, unit, size);

                doc.setFontSize(15);

                const title = resData.titre + " " + resData.startTime;

                resData = this.sortByHandler("date", resData)
                var result = []
                var res
                var column
                for (var i = 0; i < 4; i++) {
                    if (i == 0) {
                        res = resData.seances.map(seance => {
                            return seance.date.slice(0, 10) + " " + seance.creneau + "\n" + seance.titre
                        }
                        )
                        column = [
                            '',
                            ...res
                        ]
                        result = [...result, column]
                    } else if (i == 1) {
                        res = resData.seances.map(seance => {
                            return seance.objectif
                        }
                        )
                        column = [
                            'OBJECTIFS',
                            ...res
                        ]
                        result = [...result, column]
                    }
                    else if (i == 2) {
                        res = resData.seances.map(seance => {
                            return seance.phases.map(phase =>
                                phase.startTime.slice(11, 16) + " => " +
                                phase.endTime.slice(11, 16) + ": " +
                                phase.titre +
                                "\n").join("")
                        }
                        )
                        column = [
                            'PHASES',
                            ...res
                        ]
                        result = [...result, column]
                    } else if (i == 3) {
                        res = resData.seances.map(seance => {
                            return seance.phases.map(phase =>
                                phase.rendu + "\n").join("")
                        }
                        )
                        column = [
                            'RENDUS',
                            ...res
                        ]
                        result = [...result, column]
                    }
                }

                let content = {
                    columnStyles: {
                        0: {
                            halign: 'center',
                            fillColor: [150, 150, 255],
                            textColor: [255, 255, 255],
                            fontStyle: 'bold',
                            fontSize: 12,
                            lineWidth: 1
                        }
                    }, // Cells in first column centered and green
                    startY: 60,
                    body: result
                };
                doc.text(title, marginLeft, 40);
                doc.autoTable(content);
                if (indice > 0) {
                    doc.addPage();

                    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
                    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
                    doc.setTextColor(100);
                    doc.setFontSize(20);
                    doc.text(cahier?.introduction, pageWidth / 2, 30, { align: 'center' });
                    doc.setFontSize(15);
                    doc.text(20, 50, cahier?.sujet);
                    doc.setFontSize(12);
                    doc.text(20, 90, cahier?.indicationEtudiant);

                    resData.seances.map(seance => {
                        doc.addPage();
                        doc.setFontSize(15);

                        var title = seance.date.slice(0, 10) + " " + seance.creneau + "\n" + seance.titre;
                        doc.text(title, pageWidth / 2, 30, { align: 'center' });
                        doc.setFontSize(12);

                        doc.text(seance.objectif, 30, 70);
                        var l = 100
                        seance.phases.map(phase => {
                            l = l + 120
                            doc.text(phase.startTime.slice(11, 16) + " => " +
                                phase.endTime.slice(11, 16) + ": " +
                                phase.titre
                                , 30, l)
                            doc.text(phase.discription, 30, l + 30)
                        })
                    })

                }
                if (indice == 2) {
                    doc.addPage();
                    doc.text(20, 90, cahier?.indicationsTuteur);

                }
                doc.save("report.pdf")
            })

        }
        )
    }

    render() {
        /////////////////

        //////////////////////////////////
        return (
            <div>
                <h2 className="text-center">list Planning</h2>
                <button className="btn btn-primary" onClick={this.addPlanning}>Add Planning</button>
                <br></br><br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th onClick={() => this.sortTableHandler('id')}>
                                    id {this.state.sortby === 'id' ?
                                        (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                        ''
                                    }
                                </th>
                                <th onClick={() => this.sortTableHandler('titre')}>
                                    titre {this.state.sortby === 'titre' ?
                                        (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                        ''
                                    }
                                </th>
                                <th onClick={() => this.sortTableHandler('startTime')}>
                                    start Time {this.state.sortby === 'startTime' ?
                                        (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                        ''
                                    }
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.plannings.map(
                                    planning =>
                                        <tr key={planning.id}>
                                            <td>{planning.id} </td>
                                            <td>{planning.titre} </td>
                                            <td>{planning.startTime} </td>
                                            <td>
                                                {/* <button onClick={() => this.editPlanning(planning.id)} className="btn btn-info">Update</button> */}
                                                {/* <button style={{ marginLeft: "10px" }} onClick={() => this.deletePlanning(planning.id)} className="btn btn-danger">Delete</button> */}
                                                <button style={{ marginLeft: "10px" }} onClick={() => {
                                                    if (window.confirm('Are you sure you wish to delete this item?'))
                                                        this.deletePlanning(planning.id)
                                                }} className="btn btn-danger">Delete</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewPlanning(planning.id)} className="btn btn-info">View</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.expoterPlanning(planning.id)} className="btn btn-danger">Export</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.exportPDF(planning.id, 0)} className="btn btn-success">PlanningPDF</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.exportPDF(planning.id, 1)} className="btn btn-success">EtudiantPDF</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.exportPDF(planning.id, 2)} className="btn btn-success">TuteurPDF</button>

                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        );
    }
}

export default ListPlanningComponent;