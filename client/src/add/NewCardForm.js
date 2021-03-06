import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton, Form } from 'react-bootstrap';
import collar from '../images/collar.png';
import paw_upload from '../images/paw_upload.png'

class NewCardForm extends Component {
    state = {
        name: '',
        sex: 'Мальчик',
        age: '0-2',
        bio: '',
        thumbnail: '',
        selectedPhoto: ''
    };

    //constructor(props) {
    //    super(props);
    //}

    addButtonClickHandler = () => {
        //if (!this.validateData()) {
        //    return;
        //}

        let stateCopy = {
            name: this.state.name,
            sex: this.state.sex,
            age: this.state.age,
            bio: this.state.bio,
            thumbnail: this.state.thumbnail,
            selectedPhoto: this.state.selectedPhoto
        }
        this.props.addCardHandler(stateCopy);
        this.setDefaultState();
    }

    setDefaultState = () => {
        this.setState({
            name: '',
            sex: 'Мальчик',
            age: '0-2',
            bio: '',
            thumbnail: '',
            selectedPhoto: ''
        });
    }

    validateData() {
        return true;
    }

    triggerPhotoUpload = () => this.photoUpload.click();

    onChangeUploadHandler = (event) => {
        this.setState({
            thumbnail: URL.createObjectURL(event.target.files[0]),
            selectedPhoto: event.target.files[0]
        })
    }

    render() {
        return (
            <div className="mb-5">
                <div className="text-center">
                    <img src={collar} height='80' className="mt-3" alt=""></img>
                    <h2 className="mt-3">Новый подопечный</h2>
                    <p className="lead">Здесь Вы можете заполнить форму о Вашем подопечном, который ищет новый дом.</p>
                </div>

                <div className="container d-flex justify-content-center">
                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-12">
                        <div className="col-12">

                            <div className="d-flex justify-content-center" id="file">
                                <input ref={photoUpload => this.photoUpload = photoUpload}
                                    type="file" name="photo" onChange={this.onChangeUploadHandler}
                                    accept="image/*"
                                    hidden />

                                <div onClick={this.triggerPhotoUpload} className="upload-image-box">
                                    <img
                                        src={this.state.thumbnail ? this.state.thumbnail : paw_upload} alt="" />
                                    <div className="text-middle p-2">
                                        <div>{this.state.thumbnail ? "Выбрать новое" : "Загрузить фото"}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="small-cardform-justify">Кличка</label>
                                <input onChange={(event) => { this.setState({ name: event.target.value }) }} value={this.state.name} className="form-control mr-sm-2" type="text" placeholder="Кличка" id="name" />
                            </div>

                            <label className="small-cardform-justify">Пол</label>
                            <div className='mb-3 small-cardform-justify' id="sex">
                                <ToggleButtonGroup type="radio" name="sex" defaultValue="Мальчик"
                                    value={this.state.sex}
                                    onChange={(event) => { this.setState({ sex: event }); }}
                                >
                                    <ToggleButton value="Мальчик">Мальчик</ToggleButton>
                                    <ToggleButton value="Девочка">Девочка</ToggleButton>
                                    <ToggleButton value="Неизвестно">Неизвестно</ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                            <label className="small-cardform-justify" >Возраст</label>
                            <div className='mb-3 small-cardform-justify' id="age">
                                <ToggleButtonGroup type="radio" name="age" defaultValue="0-2"
                                    value={this.state.age}
                                    onChange={(event) => { this.setState({ age: event }); }}
                                >
                                    <ToggleButton value="0-2">0-2</ToggleButton>
                                    <ToggleButton value="3-6">3-6</ToggleButton>
                                    <ToggleButton value="7+">7+</ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                            <label>Дополнительная информация</label>
                            <Form.Group id="bio">
                                <Form.Control onChange={(event) => { this.setState({ bio: event.target.value }) }}
                                    as="textarea" rows="5" placeholder="Информация о питомце (140 символов)" maxLength="140"
                                    name="bio" value={this.state.bio} className="noresize" />
                            </Form.Group>

                            <div className="d-flex flex-column small-cardform-justify">
                                <button onClick={this.addButtonClickHandler} className="btn btn-primary">Добавить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewCardForm;