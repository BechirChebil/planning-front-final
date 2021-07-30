// import React, { Component } from 'react';
// import PlanningService from '../services/PlanningService';

// import TextField from '@material-ui/core/TextField';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import DatePicker from '@material-ui/lab/DatePicker';
// import moment from 'moment';
// import SeanceService from '../services/SeanceService';
// import PhaseService from '../services/PhaseService';

// const DATE_TIME_FORMAT = 'yyyy-MM-DD';
// class ExportPlanning extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             id: this.props.match.params.id, //step 2
//             titre: '',
//             startTime: '',
//             seances: {},
//             plannings: []
//         }

//         this.changeTitreHandler = this.changeTitreHandler.bind(this);
//         this.changeStartTimeHandler = this.changeStartTimeHandler.bind(this);
//         this.savePlanning = this.savePlanning.bind(this);
//     }
//     //step 3
//     componentDidMount() {
//         ///////////
//         PlanningService.getPlannings().then((res) => {
//             this.setState({ plannings: res.data })
//         })
//         //////////////

//         PlanningService.getPlanningById(this.state.id).then((res) => {
//             let planning = res.data;
//             this.setState({
//                 titre: planning.titre,
//                 startTime: planning.startTime,
//             });
//         })
//         SeanceService.getSeances().then((res) => {
//             this.setState({ seances: res.data })
//         })
//         PhaseService.getPhases().then((res) => {
//             this.setState({ phases: res.data })
//         })

//     }

//     savePlanning = (p) => {
//         p.preventDefault();
//         let planning = { titre: this.state.titre, startTime: this.state.startTime };
//         //console.log('planning => ' + JSON.stringify(planning));
    


//         PlanningService.addPlanning(planning);


//         this.state.plannings.map((planning) => (
//             planning.id
//         ));
//         this.state.planning.seances.map(

//             seance =>
//                 this.setState({
//                //     planning: pp
//                 }),
//             console.log('seance => ' + JSON.stringify(seance)),
//             console.log('seance => ' + seance),
//             SeanceService.addSeance(seance),

            

//         );
//         {
//             this.state.planning.seances.map(
//                 (seance, i) => {
//                     console.log("Entered");
//                     // Return the element. Also pass key     
//                     return (<Answer key={id} seance={seance} />)
//                 }
//             )
//         }


//         this.props.history.push('/plannings/');
//     }

//     saveSeance = (p) => {
//         //let planning_obj = { id: this.state.planning }
//         p.preventDefault();
//         let seance = {
//             titre: this.state.titre, objectif: this.state.objectif, indicationTuteur: this.state.indicationTuteur,
//             indicationEtudiant: this.state.indicationEtudiant, date: this.state.date, creneau: this.state.creneau,
//             planning: pp //planning_obj
//         };
//         console.log('seance => ' + JSON.stringify(seance));


//         console.log('seance => ' + seance);
//         SeanceService.addSeance(seance);
//     }

//     savePhase = (p) => {
//         //let seance_obj = { id: this.state.seance }
//         p.preventDefault();
//         let phase = {
//             titre: this.state.titre, discription: this.state.discription, rendu: this.state.rendu,
//             startTime: this.state.startTime, endTime: this.state.endTime,
//             seance: this.state.seance// seance_obj
//         };
//         console.log('phase => ' + JSON.stringify(phase));

//         console.log('phase => ' + phase);
//         PhaseService.addPhase(phase);
//     }

//     changeTitreHandler = (event) => {
//         this.setState({ titre: event.target.value });
//     }


//     changeStartTimeHandler = (value) => {
//         console.log(value);
//         const formattedDateTime = moment(value).format(DATE_TIME_FORMAT);
//         this.setState({ startTime: formattedDateTime });
//     }

//     cancel() {

//         this.props.history.push('/plannings/');

//     }

//     getTitle() {

//         return <h3 className="text-center">Exporter Planning</h3>

//     }

//     render() {
//         return (
//             <div>
//                 <div className="container">
//                     <div className="row">
//                         <div className="card col-md-6 offset-md-3 offset-md-3">
//                             {
//                                 this.getTitle()
//                             }
//                             <div className="card-body">
//                                 <form>
//                                     <div className="form-group">
//                                         <label>titre:</label><br /><br />
//                                         <input placeholder="titre" name="titre" className="form-control"
//                                             value={this.state.titre} onChange={this.changeTitreHandler} />
//                                     </div><br />
//                                     <div className="form-group">
//                                         <label>start time:</label><br /><br />
//                                         <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                             <DatePicker
//                                                 inputFormat='yyyy-MM-dd'
//                                                 renderInput={(props) => <TextField {...props} />}
//                                                 className="form-date"
//                                                 value={this.state.startTime}
//                                                 onChange={(newValue) => this.changeStartTimeHandler(newValue)}
//                                             />
//                                         </LocalizationProvider>

//                                     </div><br />
//                                     <button className="btn btn-success" onClick={this.savePlanning, this.savePhase}>Save</button>
//                                     <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
//                                 </form>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default ExportPlanning;