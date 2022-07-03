import React, { Component } from "react";
import "./css/InsuranceComp.css"
import DisplayPatientToCompany from "./display_patient_to_company";

class InsuranceComp extends Component {
    //async methods and states here
    contract = this.props.contract['OPT'];
    doctorAddRecord = this.props.contract['DAR'];
    contracts = [this.contract, this.doctorAddRecord];
    accounts = this.props.Acc;

    state = {
        name: "",
        id: "",
        patient_list: [],
        count: 0
    }



    componentDidMount() {
        this.loadCompany();
    }

    componentDidUpdate(prevProps, prevState) {
        console.warn("Updated")
        if (this.state.load_patient != null && this.state.count === 0) {
            this.setState({ load_patient: null })
        }
        console.log(prevState.count, this.state.count)
    }

    async loadCompany() {
        let res = await this.contract.methods.getInsuranceCompInfo().call({ from: this.accounts[0] });
        console.log(res);
        this.setState({ id: res[0], name: res[1], comp_license: res[2], patient_list: res[3] });
    }

    render() {
        let { name, patient_list, id } = this.state;
        return (
            <div className='container'>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 pt-5 mx-auto">
                        <div className="flex flex-col text-center w-full mb-3">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 bg-green-300">{name}</h1>
                            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">{id}</h2>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Life Insurance Company</p>
                        </div>
                    </div>
                </section>

                <div>
                    <h5 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">Patients List</h5>
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
                            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                                {
                                    patient_list.map((patient) => {
                                        return <div className="p-2 sm:w-1/2 w-full" onClick={() => { this.setState({ load_patient: patient, count: 1 - this.state.count }) }}>
                                            <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                                </svg>
                                                <span className="title-font font-medium">{patient}</span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </div>

                <div className='container'>
                    <div className='row mt-3'>
                        <div className='col'>
                            {
                                this.state.load_patient ?
                                    <div> <h5>Patient's Data <DisplayPatientToCompany contract={this.contracts} accounts={this.accounts} patient_address={this.state.load_patient} /> </h5></div> :
                                    <div></div>

                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default InsuranceComp;