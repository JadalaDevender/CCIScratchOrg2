({
    configMap: {
    'anytype': { componentDef: 'ui:inputText', attributes: {} },
    'base64': { componentDef: 'ui:inputText', attributes: {} },
    'boolean': {componentDef: 'ui:inputCheckbox', attributes: {} },
    'combobox': { componentDef: 'ui:inputText', attributes: {} },
    'currency': { componentDef: 'ui:inputText', attributes: {} },
    'datacategorygroupreference': { componentDef: 'ui:inputText', attributes: {} },
    'date': {
    componentDef: 'ui:inputDate',
    attributes: {
    displayDatePicker: true
    }
    },
    'datetime': { componentDef: 'ui:inputDateTime', attributes: {} },
    'double': { componentDef: 'ui:inputNumber', attributes: {} },
    'email': { componentDef: 'ui:inputEmail', attributes: {} },
    'encryptedstring': { componentDef: 'ui:inputText', attributes: {} },
    'id': { componentDef: 'ui:inputText', attributes: {} },
    'integer': { componentDef: 'ui:inputNumber', attributes: {} },
    'multipicklist': { componentDef: 'ui:inputText', attributes: {} },
    'percent': { componentDef: 'ui:inputNumber', attributes: {} },
    'phone': { componentDef: 'ui:inputPhone', attributes: {} },
    'picklist': { componentDef: 'ui:inputText', attributes: {} },
    'reference': { componentDef: 'ui:inputText', attributes: {} },
    'string': { componentDef: 'ui:inputText', attributes: {} },
    'textarea': { componentDef: 'ui:inputText', attributes: {} },
    'time': { componentDef: 'ui:inputDateTime', attributes: {} },
    'url': { componentDef: 'ui:inputText', attributes: {} }
    },
    
    createForm: function(cmp) {
    console.log('FieldSetFormHelper.createForm');
    var fields = cmp.get('v.fields');
    var obj = cmp.get('v.record');
    var inputDesc = [];
    var fieldPaths = [];
    for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var config = this.configMap[field.type.toLowerCase()];
    if (config) {
    config.attributes.label = field.label;
    config.attributes.required = field.required;
    config.attributes.value = obj[field.fieldPath];
    config.attributes.fieldPath = field.fieldPath;
    inputDesc.push([
    config.componentDef,
    config.attributes
    ]);
    fieldPaths.push(field.fieldPath);
    } else {
    console.log('type ' + field.type.toLowerCase() + ' not supported');
    }
    }
    
    $A.createComponents(inputDesc, function(cmps) {
    console.log('createComponents');
    var inputToField = {};
    for (var i = 0; i < fieldPaths.length; i++) {
    cmps[i].addHandler('change', cmp, 'c.handleValueChange');
    inputToField[cmps[i].getGlobalId()] = fieldPaths[i];
    }
    cmp.set('v.form', cmps);
    cmp.set('v.inputToField', inputToField);
    });
    }
    })