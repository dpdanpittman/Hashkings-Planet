import React, {Component} from 'react';
import {CountryService} from '../service/CountryService';
import {CarService} from '../service/CarService';
import {NodeService} from '../service/NodeService';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {AutoComplete} from 'primereact/autocomplete';
import {MultiSelect} from 'primereact/multiselect';
import {Calendar} from 'primereact/calendar';
import {DataTable} from 'primereact/datatable';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Tree} from 'primereact/tree';
import {Checkbox} from 'primereact/checkbox';
import {Menu} from 'primereact/menu';
import {PanelMenu} from 'primereact/panelmenu';
import {InputMask} from 'primereact/inputmask';
import {Dropdown} from 'primereact/dropdown';
import {Password} from 'primereact/password';
import {Spinner} from 'primereact/spinner';
import {Slider} from 'primereact/slider';
import {ListBox} from 'primereact/listbox';
import {RadioButton} from 'primereact/radiobutton';
import {PickList} from 'primereact/picklist';
import {OrderList} from 'primereact/orderlist';
import {ToggleButton} from 'primereact/togglebutton';
import {SelectButton} from 'primereact/selectbutton';
import {Button} from 'primereact/button';
import {SplitButton} from 'primereact/splitbutton';
import {Accordion,AccordionTab} from 'primereact/accordion';
import {Panel} from 'primereact/panel';
import {TabView, TabPanel} from 'primereact/tabview';
import {ProgressBar} from 'primereact/progressbar';
import {Dialog} from 'primereact/dialog';
import {Column} from 'primereact/column';

export class MarketSeeds extends Component {

    constructor() {
        super();
        this.state = {
            selectedHandPickedSeeds: [],
            HandPickedOptions: [
                {label: 'Hindu Kush', value: 'hk'},
                {label: 'Afghani', value: 'afg'},
                {label: 'Lashkar Gah', value: 'lkg'},
                {label: 'Mazar i Sharif', value: 'mis'},
                {label: 'Lambs Bread', value: 'lb'},
                {label: 'Kings Bread', value: 'kbr'},
                {label: 'Acapulco Gold', value: 'aca'},
                {label: 'Swazi Gold', value: 'swz'},
                {label: 'Kilimanjaro', value: 'kmj'},
                {label: 'Durban Poison', value: 'dp'},
                {label: 'Malawi', value: 'mal'},
				{label: 'Panama Red', value: 'pam'},
                {label: 'Columbian Gold', value: 'cg'},
				{label: 'Aceh', value: 'ach'},
				{label: 'Thai', value: 'tha'},
				{label: 'Chocoloate Thai', value: 'cht'}
            ],
			selectedPremiumSeeds: [],
			PremiumOptions: [
                {label: 'Hindu Kush', value: 'hk'},
                {label: 'Afghani', value: 'afg'},
                {label: 'Lashkar Gah', value: 'lkg'},
                {label: 'Mazar i Sharif', value: 'mis'},
                {label: 'Lambs Bread', value: 'lb'},
                {label: 'Kings Bread', value: 'kbr'},
                {label: 'Acapulco Gold', value: 'aca'},
                {label: 'Swazi Gold', value: 'swz'},
                {label: 'Kilimanjaro', value: 'kmj'},
                {label: 'Durban Poison', value: 'dp'},
                {label: 'Malawi', value: 'mal'},
				{label: 'Panama Red', value: 'pam'},
                {label: 'Columbian Gold', value: 'cg'},
				{label: 'Aceh', value: 'ach'},
				{label: 'Thai', value: 'tha'},
				{label: 'Chocoloate Thai', value: 'cht'}
            ],
			selectedBasicSeeds: [],
			BasicOptions: [
                {label: 'Hindu Kush', value: 'hk'},
                {label: 'Afghani', value: 'afg'},
                {label: 'Lashkar Gah', value: 'lkg'},
                {label: 'Mazar i Sharif', value: 'mis'},
                {label: 'Lambs Bread', value: 'lb'},
                {label: 'Kings Bread', value: 'kbr'},
                {label: 'Acapulco Gold', value: 'aca'},
                {label: 'Swazi Gold', value: 'swz'},
                {label: 'Kilimanjaro', value: 'kmj'},
                {label: 'Durban Poison', value: 'dp'},
                {label: 'Malawi', value: 'mal'},
				{label: 'Panama Red', value: 'pam'},
                {label: 'Columbian Gold', value: 'cg'},
				{label: 'Aceh', value: 'ach'},
				{label: 'Thai', value: 'tha'},
				{label: 'Chocoloate Thai', value: 'cht'}
            ]
        };

        this.countryService = new CountryService();
        this.carService = new CarService();
        this.nodeService = new NodeService();

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.filterCountry = this.filterCountry.bind(this);
        
        this.dataViewItemTemplate = this.dataViewItemTemplate.bind(this);
        this.orderListTemplate = this.orderListTemplate.bind(this);
    }

    componentDidMount(){
        this.setState({countriesData: this.countryService.getCountries(this)});
        this.carService.getCarsSmall().then(data => this.setState({dataTableValue: data}));
        this.carService.getCarsLarge().then(data => this.setState({dataViewValue: data}));
        this.nodeService.getTreeNodes(this).then(nodes => this.setState({treeData: nodes}));
        this.carService.getCarsSmall().then(data => this.setState({picklistSourceCars: data}));
        this.carService.getCarsSmall().then(data => this.setState({orderlistCars: data}));
    }

    filterCountry(event) {
        const results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });

        this.setState({filteredCountries: results});
    }

    onCheckboxChange(event){
        let selected = [...this.state.checkboxValue];

        if(event.checked)
            selected.push(event.value);
        else
            selected.splice(selected.indexOf(event.value), 1);

        this.setState({checkboxValue: selected});
    }

    orderListTemplate(car){
        if (!car) {
            return;
        }

        return (
            <div className="p-clearfix">
                <img src={`assets/demo/images/car/${car.brand}.png`} alt={car.brand} style={{display:'inline-block',margin:'2px 0 2px 2px', width: '50px'}} />
                <div style={{fontSize:14,float:'right',margin:'15px 5px 0 0'}}>{car.brand} - {car.year} - {car.color}</div>
            </div>
        );
    }

    dataViewItemTemplate(car,layout) {
        if (!car) {
            return;
        }

        let src = "assets/demo/images/car/" + car.brand + ".png";

        if (layout === 'list') {
            return (
                <div className="p-grid" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                    <div className="p-col-12 p-md-3">
                        <img src={src} alt={car.brand} />
                    </div>
                    <div className="p-col-12 p-md-8 car-details">
                        <div className="p-grid">
                            <div className="p-col-2 p-sm-6">Vin:</div>
                            <div className="p-col-10 p-sm-6">{car.vin}</div>

                            <div className="p-col-2 p-sm-6">Year:</div>
                            <div className="p-col-10 p-sm-6">{car.year}</div>

                            <div className="p-col-2 p-sm-6">Brand:</div>
                            <div className="p-col-10 p-sm-6">{car.brand}</div>

                            <div className="p-col-2 p-sm-6">Color:</div>
                            <div className="p-col-10 p-sm-6">{car.color}</div>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-1 search-icon" style={{marginTop:'40px'}}>
                        <Button icon="pi pi-search"></Button>
                    </div>
                </div>
            );
        }

        if (layout === 'grid') {
            return (
                <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                    <Panel header={car.vin} style={{ textAlign: 'center' }}>
                        <img src={`assets/demo/images/car/${car.brand}.png`} alt={car.brand} />
                        <div className="car-detail">{car.year} - {car.color}</div>
                        <i className="pi pi-search" style={{ cursor: 'pointer' }}></i>
                    </Panel>
                </div>
            );
        }
    }

    render() {
        const dialogFooter = (
            <Button label="Login" icon="pi pi-user" onClick={() => this.setState({dialogValue:false})} />
        );
        
        const dataViewHeader = (
            <div className="p-grid">
                <div className="p-col-6 p-md-8 filter-container">
                    <div style={{position:'relative'}}>
                        <InputText placeholder="Search by brand" onKeyUp={e => this.dv.filter(e.target.value)} />
                    </div>
                </div>
                <div className="p-col-6 p-md-4" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})} />
                </div>
            </div>
        );

        return (
            <div className="p-fluid">
                <div className="p-grid">
					<div className="p-col-3">
					</div>
                    <div className="p-col-6">
                        <div className="card card-w-title">
                            <h1>Hand-Picked Seeds</h1>
                            <div className="p-grid">
								<div className="p-col-12 p-md-2">
                                    <label htmlFor="multiselect"></label>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <MultiSelect id="multiselect" placeholder="Choose" value={this.state.selectedBasicSeeds} options={this.state.BasicOptions} onChange={event => this.setState({selectedBasicSeeds: event.value})} />
                                </div>
								<div className="p-col-12 p-md-4">
                                    <Button label="Lease Gardens" icon="pi pi-external-link" onClick={() => this.setState({dialogVisible:true})} />
                                </div>
							</div>
                        </div>
                    </div>
					<div className="p-col-3">
					</div>
					<div className="p-col-3">
					</div>
                    <div className="p-col-6">
                        <div className="card card-w-title">
                            <h1>Premium Seeds</h1>
                            <div className="p-grid">
								<div className="p-col-12 p-md-2">
                                    <label htmlFor="multiselect"></label>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <MultiSelect id="multiselect" placeholder="Choose" value={this.state.selectedPremiumSeeds} options={this.state.PremiumOptions} onChange={event => this.setState({selectedPremiumSeeds: event.value})} />
                                </div>
								<div className="p-col-12 p-md-4">
                                    <Button label="Lease Gardens" icon="pi pi-external-link" onClick={() => this.setState({dialogVisible:true})} />
                                </div>
							</div>
                        </div>
                    </div>
					<div className="p-col-3">
					</div>
					<div className="p-col-3">
					</div>
                    <div className="p-col-6">
                        <div className="card card-w-title">
                            <h1>Basic Seeds</h1>
                            <div className="p-grid">
								<div className="p-col-12 p-md-2">
                                    <label htmlFor="multiselect"></label>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <MultiSelect id="multiselect" placeholder="Choose" value={this.state.selectedHandPickedSeeds} options={this.state.HandPickedOptions} onChange={event => this.setState({selectedHandPickedSeeds: event.value})} />
                                </div>
																<div className="p-col-12 p-md-4">
                                    <Button label="Lease Gardens" icon="pi pi-external-link" onClick={() => this.setState({dialogVisible:true})} />
                                </div>
							</div>
                        </div>
                    </div>
					<div className="p-col-3">
					</div>
                </div>
            </div>
        );
    }
}