import React, { Component } from 'react';
import PlanningService from '../services/PlanningService';

class ListPlanningComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            plannings: []
        }
        this.addPlanning=this.addPlanning.bind(this);
        this.editPlanning = this.editPlanning.bind(this);
        this.deletePlanning = this.deletePlanning.bind(this);
    }

    componentDidMount(){
        PlanningService.getPlannings().then((res)=>{
            this.setState({plannings: res.data})
        } )
    }

    addPlanning(){
        this.props.history.push('/AddPlanning/-1');
    }

    editPlanning(id){
        this.props.history.push(`/AddPlanning/${id}`);
    }
    deletePlanning(id){
       PlanningService.deletePlanning(id).then(res=>{
           this.setState({plannings: this.state.plannings.filter(planning=>planning.id!==id)});
       })
    }
    viewPlanning(id){
        this.props.history.push(`/ViewPlanning/${id}`);

    }

    render() {
        return (
            <div>
                <h2 className="text-center">list Planning</h2>
                    <button className="btn btn-primary" onClick={this.addPlanning}>Add Planning</button>
                    <br></br><br></br>
                <div className="row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>titre</th>
                                <th>start time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.plannings.map(
                                    planning =>
                                    <tr key = {planning.id}>
                                        <td>{planning.titre} </td>
                                        <td>{planning.startTime} </td>
                                        <td>
                                            <button onClick={()=>this.editPlanning(planning.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft:"10px"}} onClick={()=>this.deletePlanning(planning.id)} className="btn btn-danger">Delete</button>
                                            <button style={{marginLeft:"10px"}} onClick={()=>this.viewPlanning(planning.id)} className="btn btn-info">View</button>
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