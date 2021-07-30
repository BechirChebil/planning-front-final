import React, { Component } from 'react';
import PlanningService from '../services/PlanningService';
import SeanceService from '../services/SeanceService';

class ViewPlanningComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            planning: {}

        }

        this.editPlanning = this.editPlanning.bind(this);

        this.addSeance = this.addSeance.bind(this);
        this.editSeance = this.editSeance.bind(this);
        this.deleteSeance = this.deleteSeance.bind(this);
    }


    async componentDidMount() {
        await PlanningService.getPlanningById(this.state.id).then(res => {
            this.setState({ planning: res.data });

            //console.log("1", this.state.planning.titre);
            this.state.planning.seances.map(e => console.log(e.titre));
        })
        SeanceService.getSeances().then((res) => {
            this.setState({ seances: res.data })
        })
    }

    addSeance(id) {
        this.props.history.push(`/Add2Seance/${id}`);
    }


    editSeance(id) {
        this.props.history.push(`/UpdateSeance/${id}`);
    }

    deleteSeance(id) {
        SeanceService.deleteSeance(id).then(res => {
            this.setState({ seances: this.state.seances.filter(seance => seance.id !== id) });
        })
        window.location.reload(false);
    }

    viewSeance(id) {
        this.props.history.push(`/ViewSeance/${id}`);

    }

    editPlanning(id) {
        this.props.history.push(`/AddPlanning/${id}`);
    }

    retour() {
        this.props.history.push('/plannings');
    }

    render() {

        const { planning } = this.state;
        // planning.seances.map(e=>e.id);
        console.log("2", this.state.planning.titre);

        //let seance_obj = { id: this.state.planning.seance }
        return (
            <div>
                {/*   {this.state.planning.seances.map((e)=><text>{e.titre}</text>)} */}
                <br></br>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">View planning details</h3>
                    <div className="card-body">

                        <div className="row">
                            <label>Titre: </label>
                            <input className="form-control" disabled
                                value={this.state.planning.titre} />
                        </div>

                        <div className="row">
                            <label>Start Time: </label>
                            <input className="form-control" disabled
                                value={this.state.planning.startTime} />
                        </div>
                    </div>
                </div>
                <button className="btn btn-success" onClick={this.retour.bind(this)} style={{ marginLeft: "350px" }} >Retour</button>
                <button style={{ marginLeft: "400px" }} onClick={() => this.editPlanning(this.state.planning.id)} className="btn btn-info">Update</button>
                <br></br><br></br>
                <h2 className="text-center">List Seance</h2>
                <button className="btn btn-primary" onClick={() => this.addSeance(planning.id)}>Add Seance</button>
                <br></br><br></br>
                {/* <div className="row"> */}
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>titre</th>
                            <th>objectif</th>
                            <th>indicationTuteur</th>
                            <th>indicationEtudiant</th>

                            <th>date</th>
                            <th>creneau</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            this.state.planning.titre != null ? this.state.planning.seances.map(
                                seance =>
                                    <tr key={seance.id}>
                                        <td>{seance.titre} </td>
                                        <td>{seance.objectif} </td>
                                        <td>{seance.indicationTuteur} </td>
                                        <td>{seance.indicationEtudiant} </td>

                                        <td>{seance.date} </td>
                                        <td>{seance.creneau} </td>

                                        <td>
                                            <button onClick={() => this.editSeance(seance.id)} className="btn btn-info">Update</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => {
                                                if (window.confirm('Are you sure you wish to delete this item?'))
                                                    this.deleteSeance(seance.id)
                                            }} className="btn btn-danger">Delete</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => this.viewSeance(seance.id)} className="btn btn-info">View</button>



                                        </td>
                                    </tr>
                            ) : null
                        }
                    </tbody>
                </table>
                {/* </div> */}


            </div>
        );
    }
}

export default ViewPlanningComponent;