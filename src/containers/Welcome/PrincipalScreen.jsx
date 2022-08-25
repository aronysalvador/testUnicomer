import React, {useState, useEffect} from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import '../../App.css';
import { useTranslation } from "react-i18next";
import { updateForm } from "../../redux/actions/WeatherAction";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import spain from '../../assest/icons/spain.svg'
import uk from '../../assest/icons/uk.svg'
import Table from "../../components/Table"
import orderBy from "lodash/orderBy";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const PrincipalScreen = () => {
	const {
		WeatherForm: { dataFrom, language },
	  } = useSelector((state) => state, shallowEqual);

	const dispatch = useDispatch();

 	const [t, i18n] = useTranslation("global");

	const selectLanguaje = (lan) => {
		i18n.changeLanguage(lan)
		dispatch(updateForm("language", lan));
	};

	const [data, setData] = useState({"firstName": "", "lastName":"","birthday": "" ,"gender": "","cellPhone": "","address":"","profession":"","incomes":""});

	const handleChange =  (e) => {
		setData({
			...data, [e.target.name]: e.target.value
		})
	};

	const handleSubmit =  (e) => {
		e.preventDefault();
		const err = validate();
		if(!err){
			setData({"firstName": "", "lastName":"","birthday": "" ,"gender": "","cellPhone": "","address":"","profession":"","incomes":""})
	 		setInfo({ ...info, datafromTable:[...info.datafromTable, data]})
		}
	};

	const validate = () => {
		let isError = false;
		const errors = {
		  firstNameError: "",
		  lastNameError: "",
		  dateError:"",
		  genderError:"",
		  cellphoneError: "",
		  addressError: "",
		  professionError: "",
		  incomesError:""
		};
	
		if (data.firstName.length === 0) {
		  isError = true;
		  errors.firstNameError = "First Name Field Required";
		}
		if (data.lastName.length === 0) {
			isError = true;
			errors.lastNameError = "Last Name Field Required";
		}
		if (data.birthday.length === 0) {
			isError = true;
			errors.dateError = "Birthday Field Required";
		}	
		if (data.gender.length === 0) {
			isError = true;
			errors.genderError = "Gender Field Required";
		}
		if (data.cellPhone.length === 0) {
			isError = true;
			errors.cellphoneError = "Cellphone Field Required";
		}
		if (data.address.length === 0) {
			isError = true;
			errors.addressError = "Address Home Field Required";
		}
		if (data.profession.length === 0) {
			isError = true;
			errors.professionError = "Profession Field Required";
		}	
		if (data.incomes.length === 0) {
			isError = true;
			errors.incomesError = "Incomes Field Required";
		}
		setData({
			...data, errors
		})	
		return isError;
	  };

	const [info, setInfo] = useState(() => {return dataFrom ? dataFrom :  {
		datafromTable: [],query: "", columnToQuery: "firstName"
	}});

	useEffect(()=>{
		dispatch(updateForm("dataFrom", info));
		// eslint-disable-next-line
	},[info])

	const lowerCaseQuery = info.query.toLowerCase();
	
	return (
		<div className="App">
			<header className="App-header">
				<div className="container">
					<div className="row">
						<div className="col-lg-2">
							<img src="https://grupounicomer.com/wp-content/uploads/2018/12/logo.png" alt="unicomer" height="75px"/>
						</div>
						<div className="col-lg-2" style={{ marginTop: '20px'}}>
							<Grid>
								{t("header.hello")}
							</Grid>
						</div>
						<div className="col-lg-8" style={{ marginTop: '20px', textAlign:"right"}}>
						{ t("header.description")} : {t("header.language")  } 
						<img src={language === "es" ? spain : uk} alt="flag"  style={{marginRight: "20px", marginLeft:"20px"}}/>
							<Button variant="contained"  onClick={() =>selectLanguaje("es")} className="margin" style={{marginRight: "20px"}}>ES</Button>
							<Button variant="contained"  onClick={() =>selectLanguaje("en")} >EN</Button>
						</div>
					</div>
				</div>
			
			</header>
			
			<body className="App-body">
				<div className="container">
					<form onSubmit={ e => handleSubmit(e)} className="textForm" >
						<div className="row">
							<div className="col-lg-3 letterUnicomer2"  style={{marginTop: "130px",textAlign: "right"}}>
								<Grid>
									{t("header.form")}
								</Grid>
							</div>
							<div className="col-lg-9">
							<div className="row" style={{ marginBottom : '10px', marginTop: '10px'}}>
							<div className="col-lg-6" >
							<TextField
								name="firstName"
								label={t("body.firstName")}
								value={data.firstName}
								onChange={e => handleChange(e)}
								style={{ float : 'right'}}
								error={data?.errors?.firstNameError}
								helperText={data?.errors?.firstNameError && `${data?.errors?.firstNameError}`}
								/>
							</div>
							<div className="col-lg-6" >
							<TextField
								name="lastName"
								label={t("body.lastName")}
								value={data.lastName}
								onChange={e => handleChange(e)}		
								style={{ float : 'left'}}
								error={data?.errors?.lastNameError}
								helperText={data?.errors?.lastNameError && `${data?.errors?.lastNameError}`}
								/>
							</div>
						</div>
						<div className="row" style={{ marginBottom : '10px'}}>
							<div className="col-lg-6" >
							<TextField
								name="birthday"
								type="date"
								value={data.birthday}
								onChange={e => handleChange(e)}
								style={{ float : 'right', width: "223px"}}
								error={data?.errors?.dateError}
								helperText={data?.errors?.dateError && `${data?.errors?.dateError}`}
								/>
							</div>
							<div className="col-lg-6" >
							
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								name="gender"
								value={data.gender}
								label={t("body.select")}
								onChange={e => handleChange(e)}
								style={{ float : 'left', width: "223px"}}
								error={data?.errors?.genderError}
								helperText={data?.errors?.genderError && `${data?.errors?.genderError}`}
								>
								<MenuItem value={t("body.none")}>
									<em>{t("body.none")}</em>
								</MenuItem>
								<MenuItem   value={t("body.male")}>{t("body.male")}</MenuItem>
								<MenuItem  value={t("body.female")}>{t("body.female")}</MenuItem>
								</Select>
							
								
							</div>
						</div>
						<div className="row" style={{ marginBottom : '10px'}}>
							<div className="col-lg-6" >
							<TextField
								name="cellPhone"
								label={t("body.cellphone")}
								inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
								floatingLabelText="CellPhone"
								value={data.cellPhone}
								onChange={e => handleChange(e)}
								style={{ float : 'right'}}
								error={data?.errors?.cellphoneError}
								helperText={data?.errors?.cellphoneError && `${data?.errors?.cellphoneError}`}
								/>
							</div>
							<div className="col-lg-6" >
							<TextField
								name="address"
								label={t("body.address")}
								floatingLabelText="Address"
								value={data.address}
								onChange={e => handleChange(e)}
								style={{ float : 'left'}}
								error={data?.errors?.addressError}
								helperText={data?.errors?.addressError && `${data?.errors?.addressError}`}
								/>
							</div>
						</div>
						<div className="row" style={{ marginBottom : '10px'}}>
							<div className="col-lg-6">
							<TextField
								name="profession"
								label={t("body.profession")}
								value={data.profession}
								onChange={e => handleChange(e)}
								style={{ float : 'right'}}
								error={data?.errors?.professionError}
								helperText={data?.errors?.professionError && `${data?.errors?.professionError}`}
								/>
							</div>
							<div className="col-lg-6">
							<TextField
								name="incomes"
								label={t("body.incomes")}
								inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
								value={data.incomes}
								onChange={e => handleChange(e)}
								style={{ float : 'left'}}
								error={data?.errors?.incomesError}
								helperText={data?.errors?.incomesError && `${data?.errors?.incomesError}`}
								/>
							</div>
						</div>
						<div className="row" style={{ marginBottom : '10px'}}>
						<div className="col-lg-12 ">
							<Button   type="submit" variant="contained" className="margin">{t("body.send")}</Button>
						</div>
						</div>
							</div>
						</div>						
					</form>

					<div className="row" style={{ marginBottom : '10px'}}>
						<div className="col-lg-6">
						<InputLabel id="demo-simple-select-helper-label">{t("body.findClient")}</InputLabel>
							<TextField
								name="Query"
								label={t("body.find")}
								value={info.query}
                				onChange={e => setInfo({ ...info, query: e.target.value })}							
								/>
						</div>
						<div className="col-lg-6">
							<InputLabel id="demo-simple-select-helper-label">{t("body.select")}</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								value={info.columnToQuery}
								label={t("body.select")}
								onChange={e => setInfo({ ...info, columnToQuery: e.target.value })}
								style={{width: "223px"}}
							>
							<MenuItem value="">
								<em>{t("body.none")}</em>
							</MenuItem>
							<MenuItem value="firstName">{t("body.firstName")}</MenuItem>
							<MenuItem value="lastName">{t("body.lastName")}</MenuItem>
							<MenuItem value="birthday">{t("body.birthday")}</MenuItem>
							<MenuItem value="gender">{t("body.gender")}</MenuItem>
							<MenuItem value="cellphone">{t("body.cellphone")}</MenuItem>
							<MenuItem value="address">{t("body.address")}</MenuItem>
							<MenuItem value="profession">{t("body.profession")}</MenuItem>
							<MenuItem value="incomes">{t("body.incomes")}</MenuItem>
							</Select>
						</div>

					</div>
					<div className="row letterUnicomer" style={{ marginBottom : '10px'}}>
						<Table
							data={orderBy(
							info.query
								? info.datafromTable.filter(x =>
									x[info.columnToQuery]
									.toLowerCase()
									.includes(lowerCaseQuery)
								)
								: info.datafromTable
							)}
							header={[
							{
								name: `${t("body.firstName")}`,
								prop: "firstName"
							},
							{
								name: `${t("body.lastName")}`,
								prop: "lastName"
							},
							{
								name: `${t("body.birthday")}`,
								prop: "birthday"
							},
							{
								name: `${t("body.gender")}`,
								prop: "gender"
							},
							{
								name: `${t("body.cellphone")}`,
								prop: "cellPhone"
							},
							{
								name: `${t("body.address")}`,
								prop: "address"
							},
							{
								name: `${t("body.profession")}`,
								prop: "profession"
							},
							{
								name: `${t("body.incomes")}`,
								prop: "incomes"
							}
							]}
						/>
					</div>
				</div>
			</body>
		</div>
	);
};

export default PrincipalScreen;