import React, { Component } from 'react';
import SeanceService from '../services/SeanceService';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class ViewSeanceComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            seance: {},
        }
        
        this.editSeance = this.editSeance.bind(this);
    }

    editSeance(id) {
        this.props.history.push(`/AddSeance/${id}`);
    }
    retour() {
        this.props.history.push('/seances');
    }

    componentDidMount() {
        SeanceService.getSeanceById(this.state.id).then(res => {
            this.setState({ seance: res.data });
        })
    }

    render() {
        const { seance } = this.state;
        console.log(seance.planning);
        let planning_obj = { id: this.state.seance.planning }
        return (
            <div>
                <br></br>
                <div className="card col-md-6 ofset-md-3">
                    <h3 className="text-center">View seance details</h3>
                    <div className="card-body">

                        <div className="row">
                            <label>Titre: </label>
                            <input className="form-control" disabled
                                value={" ",seance.titre} />
                            
                        </div>

                        <div className="row">
                            <label>Objectif: </label>
                            <TextareaAutosize
                                value={seance.objectif}
                                disabled
                                //aria-label="empty textarea"

                                style={{ width: 1000 }}
                                className="form-control"
                            />
                        </div>

                        <div className="row">
                            <label>Creneau: </label>
                            <input className="form-control" disabled
                                value={" ",seance.creneau} />
                            
                        </div>

                        <div className="row">
                            <label>Date: </label>
                            <input className="form-control" disabled
                                value={seance.date} />
                        </div>
                        <div className="row">
                            <label>indication Tuteur:</label>
                            <input className="form-control" disabled
                                value={seance.indicationTuteur} />
                        </div>

                        <div className="row">
                            <label>indication Etudiant: </label>
                            <input className="form-control" disabled
                                value={seance.indicationEtudiant} />
                        </div>

                        <div className="row">
                            <label>Planning_id: </label>
                            <input className="form-control" disabled
                                value={seance.planning ? seance.planning.titre : 'None'} />
                            <div></div>
                        </div>
                    </div>
                </div>
                <br></br>
                <button className="btn btn-success" onClick={this.retour.bind(this)} style={{ marginLeft: "10px" }}>Retour</button>
                <button style={{ marginLeft: "400px"}} onClick={() => this.editSeance(seance.id)} className="btn btn-info">Update</button>
            </div>
        );
    }
}

export default ViewSeanceComponent;