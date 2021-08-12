import React, { Component } from 'react';
import CahierService from '../services/CahierService';
import PlanningService from '../services/PlanningService';
import Snackbar from '@material-ui/core/Snackbar';

class PlanningCahierComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id, //step 2
            planning: {},
            idCahier: '',
            introduction: '',
            sujet: '',
            indicationEtudiant: '',
            indicationsTuteur: '',
            exist: false,
            openSnackBar: false,

        }

        this.changeIntroductionHandler = this.changeIntroductionHandler.bind(this);
        this.changeSujetHandler = this.changeSujetHandler.bind(this);
        this.changeIndicationEtudiantHandler = this.changeIndicationEtudiantHandler.bind(this);
        this.changeIndicationTuteurHandler = this.changeIndicationTuteurHandler.bind(this);
    }
    //step 3
    componentDidMount() {
        PlanningService.getPlanningById(this.state.id).then(res => {
            this.setState({ planning: res.data });
        }).then(() => {
            CahierService.getCahierByPlanning(this.state.planning).then((res) => {
                if (res.data.length > 0) {
                    this.setState({ idCahier: res.data[0].id });
                    this.setState({ introduction: res.data[0].introduction });
                    this.setState({ sujet: res.data[0].sujet });
                    this.setState({ indicationEtudiant: res.data[0].indicationEtudiant });
                    this.setState({ indicationsTuteur: res.data[0].indicationsTuteur });
                    this.setState({ exist: true })
                }
            })
        })

    }

    changeIntroductionHandler = (event) => {
        this.setState({ introduction: event.target.value });
    }
    changeSujetHandler = (event) => {
        this.setState({ sujet: event.target.value });
    }
    changeIndicationEtudiantHandler = (event) => {
        this.setState({ indicationEtudiant: event.target.value });
    }
    changeIndicationTuteurHandler = (event) => {
        this.setState({ indicationsTuteur: event.target.value });
    }
    retour() {
        this.props.history.push(`/ViewPlanning/${this.state.id}`);
    }
    saveOrUpdateCahier = (p) => {
        p.preventDefault();
        let cahier = {
            introduction: this.state.introduction,
            sujet: this.state.sujet,
            indicationEtudiant: this.state.indicationEtudiant,
            indicationsTuteur: this.state.indicationsTuteur,
            planning: this.state.planning
        };

        if (!this.state.exist)
            CahierService.addCahier(cahier).then(res => {
                this.setState({ openSnackBar: true });
                setInterval(() => {
                    this.setState({ openSnackBar: false });
                }, 3000);
            });

        else
            CahierService.updateCahier(cahier, this.state.idCahier).then(res => {
                this.setState({ openSnackBar: true });
                setInterval(() => {
                    this.setState({ openSnackBar: false });
                }, 3000);
            });

    }
    handleCloseSnackBar = () => {
        this.setState({ openSnackBar: false });

    };
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                <h3 className="text-center">{this.state.exist ? "Update " : "Add "} Notebook</h3>
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>introduction:</label><br /><br />
                                        <textarea required placeholder="introduction" name="introduction" className="form-control"
                                            value={this.state.introduction} onChange={this.changeIntroductionHandler} />
                                    </div><br />
                                    <div className="form-group">
                                        <label>sujet:</label><br /><br />
                                        <input required placeholder="sujet" name="sujet" className="form-control"
                                            value={this.state.sujet} onChange={this.changeSujetHandler} />
                                    </div><br />
                                    <div className="form-group">
                                        <label>indicationEtudiant:</label><br /><br />
                                        <textarea required placeholder="indicationEtudiant" name="indicationEtudiant" className="form-control"
                                            value={this.state.indicationEtudiant} onChange={this.changeIndicationEtudiantHandler} />
                                    </div><br />
                                    <div className="form-group">
                                        <label>indicationsTuteur:</label><br /><br />
                                        <textarea required placeholder="indicationsTuteur" name="indicationsTuteur" className="form-control"
                                            value={this.state.indicationsTuteur} onChange={this.changeIndicationTuteurHandler} />
                                    </div><br />



                                    <button className="btn btn-success" onClick={this.saveOrUpdateCahier.bind(this)}>Save</button>
                                    <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={this.retour.bind(this)}>Retour</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                <Snackbar
                    severity="success"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.openSnackBar}
                    onClose={this.handleClose}
                    message={this.state.exist ? ' Successfull Update' : ' Successfull Add'}
                    key={'bottom' + 'left'}
                />
            </div>
        );
    }
}

export default PlanningCahierComponent;