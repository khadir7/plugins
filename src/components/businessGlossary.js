import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
// import * as ovalEdgeActions from '../../store/actions/index'
// import Popup from '../popup/popup';
// import Input from '../input/input';
// import produce from 'immer';
import styled from "styled-components";
import { ActionMethods } from 'store/actions/';
const { getBusinessGlossaryData, getOvalEdgeDomains } = ActionMethods;


const Detail = styled.div`
  height: 45px;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
`;

const DetailHeader = styled.div`
  padding: 0px 12px;
`;

const DetailContent = styled.div`
  padding: 0px 12px;
`;

class BusinessGlossary extends Component {
    state = {
        suggestBusinessGlossaryForm: {
            suggestTerm: {
                label: 'Suggest Term',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Suggest Term'
                },
                value: '',
                setPath: 'value'
            },
            description: {
                label: 'Description',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                setPath: 'value'
            },
            ovalEdgeDomains: {
                label: 'Domain',
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: '',
                setPath: 'globalDomainId'
            }
        },
        loading: false
    }
    componentDidMount () {
        if (this.props.selectedBrowserValue) {
            this.props.action.getBusinessGlossaryData(this.props.selectedBrowserValue)
            this.props.action.getOvalEdgeDomains()
        }
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedsuggestBusinessGlossaryForm = {
            ...this.state.suggestBusinessGlossaryForm
        };
        const updatedFormElement = { 
            ...updatedsuggestBusinessGlossaryForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedsuggestBusinessGlossaryForm[inputIdentifier] = updatedFormElement;
        this.setState({suggestBusinessGlossaryForm: updatedsuggestBusinessGlossaryForm});
    }
    onSubmitFormButton (close) {
        this.props.insertBusinessGlossary({
            globaldomainid: this.state.suggestBusinessGlossaryForm.ovalEdgeDomains.value,
            name: this.state.suggestBusinessGlossaryForm.suggestTerm.value,
            description: this.state.suggestBusinessGlossaryForm.description.value
        })
        close()
        // this.props.getBusinessGlossaryData(this.props.selectedBrowserValue)
    }
    render () {
        // const formElementsArray = [];
        // if (this.props.ovalEdgeDomains.length > 0 
        //     && this.props.glossaryData.length === 0
        //     && this.state.suggestBusinessGlossaryForm.ovalEdgeDomains.elementConfig.options <= 0
        // ) {
        //     this.setState(
        //         produce(prevState => {
        //             prevState.suggestBusinessGlossaryForm.ovalEdgeDomains.elementConfig.options = this.props.ovalEdgeDomains
        //             prevState.suggestBusinessGlossaryForm.ovalEdgeDomains.elementConfig.value = this.props.ovalEdgeDomains[0].globalDomainId
        //             prevState.suggestBusinessGlossaryForm.suggestTerm.elementConfig.value = this.props.selectedBrowserValue
        //         })
        //     )
        // }
        // for (let key in this.state.suggestBusinessGlossaryForm) {
        //     formElementsArray.push({
        //         id: key,
        //         config: this.state.suggestBusinessGlossaryForm[key]
        //     });
        // }
        // let form = (
        //     this.props.ovalEdgeDomains ?
        //     <form>
        //         {formElementsArray.map((formElement) => (
        //             <Input 
        //                 key={formElement.id}
        //                 label={formElement.config.label}
        //                 elementType={formElement.config.elementType}
        //                 elementConfig={formElement.config.elementConfig}
        //                 value={formElement.config.value}
        //                 setPath={formElement.config.setPath}
        //                 changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        //         ))}
        //         {/* <button btnType="Success">ORDER</button> */}
        //     </form>
        //     : ''
        // );
        let businessGlossaryItems = ''
        if (this.props.selectedBrowserValue) {
            if (this.props.glossaryData && this.props.glossaryData.length > 0) {
                businessGlossaryItems = this.props.glossaryData.map(eachGlossaryResponse => (
                    Object.keys(eachGlossaryResponse).map(key => 
                        (key === 'businessglossaryid' || key === 'name' || key === 'description' || key=== 'steward' || key === 'domain')
                        ? ( <Detail>
                                <DetailHeader>{key}</DetailHeader>
                                <DetailContent>{eachGlossaryResponse[key]}</DetailContent>
                          </Detail> )
                        : ''
                    )
                ))
            }
            // if (businessGlossaryItems === '') {
            //     businessGlossaryItems = (
            //         <div>
            //             <option value='glossary-failed'>No Business Glossary Term found</option> 
            //             <Popup 
            //                 selectedBrowserValue={this.props.selectedBrowserValue} 
            //                 children={form}
            //                 onSubmitFormButton={(close) => this.onSubmitFormButton(close)}
            //             />
            //         </div>
            //     )
            // }
        } else {
            businessGlossaryItems = ''
        }
        return (
            <div className="business-glossary">
                {businessGlossaryItems}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const  { ovalEdgeBusinessGlossary } = state
    return {
        glossaryData: ovalEdgeBusinessGlossary.businessGlossary,
        glossaryDataError: ovalEdgeBusinessGlossary.error,
        ovalEdgeDomains: ovalEdgeBusinessGlossary.ovalEdgeDomains,
        ovalEdgeDomainsError: ovalEdgeBusinessGlossary.ovalEdgeDomainsError
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        action: bindActionCreators(
            {
                getBusinessGlossaryData,
                getOvalEdgeDomains
            },
            dispatch
        )
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(BusinessGlossary);