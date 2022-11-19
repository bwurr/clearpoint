/// <reference types="cypress" />
const TODO_ITEMS_PATH = '/todoItems';
const TODO_ITEMS_DESC = 'itemstodo_desc';
const TODO_ITEMS_UPDATED = 'itemstodo_desc_updated';

/**
 * Feature to test todoitem api endpoints
 */
describe('todoitem api tests', () => {
    
    /**
     * Single get, only caring about 200 response in this one
     */    
    it('todoitems single get', () =>{
        cy.request({
            method: 'GET',
            url: `${TODO_ITEMS_PATH}`,
            headers: {accept: 'application/json'}
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    /**
     * Single get for an item that doesn't exist, only caring about the 404 response
     */    
    it('todoitems single get 404', () =>{
        let id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        cy.request({
            method: 'GET',
            url: `${TODO_ITEMS_PATH}/${id}`,
            headers: {accept: 'application/json'},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        })
    })

    /**
     * Create, Get, Update, Get - The source is refreshed new every time
     * Ideally these would be single action test single outcome, but in this case it's probably better to combine in a flow
     * For an immediate solution with the async calls they are nested
     * In c# the id/description would be stored and passed to subsequent requests synchronously
     */
     it('todoitems create item, get item, update item, final get to prove the update', () =>{
        //POST and retain the id - id should be unique every time
        let description = TODO_ITEMS_DESC + makeDesc(8);
        cy.request({
            method: 'POST',
            url: `${TODO_ITEMS_PATH}`,
            headers: {contentType: 'application/json'},
            body: {
                'description': description
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).length.to.gt(1);

            //Store the id to pass to subsequent requests
            const id = response.body;  
            return {id, description}; 
        })
        .then((result) => {
            cy.request({
                method: 'GET',
                url: `${TODO_ITEMS_PATH}/` + result.id,
                headers: {accept: 'application/json'}
            }).then((responseFromFirstGet) => {
                expect(responseFromFirstGet.status).to.eq(200);
                expect(responseFromFirstGet.body).to.have.property('description', description);
                return result.id;
            })  
        })
        .then((id) => {
            cy.request({
                method: 'PUT',
                url: `${TODO_ITEMS_PATH}/${id}`,
                headers: {contentType: 'application/json'},
                body: {
                    'id': id,
                    'description': TODO_ITEMS_UPDATED,
                    'isCompleted': true
                }
            }).then((response) => {
                expect(response.status).to.eq(204);
                return id;
            })
        })
        .then((id) => {
            cy.request({
                method: 'GET',
                url: `${TODO_ITEMS_PATH}/${id}`,
                headers: {accept: 'application/json'}
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('description', TODO_ITEMS_UPDATED);
            })
        })
    })

    /**
     * Bad request response expected when posting invalid body
     */    
    it('todoitems single post bad request returns 400', () =>{
        cy.request({
            method: 'POST',
            url: `${TODO_ITEMS_PATH}`,
            headers: {contentType: 'application/json'},
            failOnStatusCode: false,
            body: {
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    /**
     * Bad request response expected when PUTting an invalid body
     */    
    it('todoitems single put bad request returns 400', () =>{
        let description = TODO_ITEMS_DESC + makeDesc(8);
        cy.request({
            method: 'POST',
            url: `${TODO_ITEMS_PATH}`,
            headers: {contentType: 'application/json'},
            body: {
                'description': description
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).length.to.gt(1);
            return response.body
        }).then((id) => {
            cy.request({
                method: 'PUT',
                url: `${TODO_ITEMS_PATH}/${id}`,
                headers: {contentType: 'application/json'},
                failOnStatusCode: false,
                body: {
                    'description': TODO_ITEMS_UPDATED,
                    'isCompleted': true
                }
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })
    })
    
    /**
     * Conflict response expected when posting a second item with the same description
     */    
     it('todoitems second post with the same description returns 409', () =>{
        let description = TODO_ITEMS_DESC + makeDesc(8);
        cy.request({
            method: 'POST',
            url: `${TODO_ITEMS_PATH}`,
            headers: {contentType: 'application/json'},
            body: {
                'description': description
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).length.to.gt(1);
        }).then(() => {
            cy.request({
                method: 'POST',
                url: `${TODO_ITEMS_PATH}`,
                headers: {contentType: 'application/json'},
                failOnStatusCode: false,
                body: {
                    'description': description
                }
            }).then((response) => {
                expect(response.status).to.eq(409);
            })
        })
    })


    /**
     * makeDesc - returns a random string the length specified
     * @param length 
     * @returns the string requested
     */
    function makeDesc(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
})