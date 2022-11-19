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
     */
     it('todoitems create item, get item, delete item, final get to prove 404', () =>{
        //POST and retain the id
        cy.request({
            method: 'POST',
            url: `${TODO_ITEMS_PATH}`,
            headers: {contentType: 'application/json'},
            body: {
                'description': TODO_ITEMS_DESC
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).length.to.eq(1);

            //Store the id to pass to subsequent requests
            let id = response.body[0];
            return id;
        //Verify the item was created    
        }).then((id) => {
            cy.request({
                method: 'GET',
                url: `${TODO_ITEMS_PATH}/${id}`,
                headers: {accept: 'application/json'}
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body[0]).to.have.property('description', TODO_ITEMS_DESC);
            })
            return id;
        }).then((idtoupdate) => {
            cy.request({
                method: 'PUT',
                url: `${TODO_ITEMS_PATH}/${idtoupdate}`,
                headers: {contentType: 'application/json'},
                body: {
                    'description': TODO_ITEMS_UPDATED
                }
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).length.to.eq(1);
    
                //Store the id to pass to subsequent requests
                let id = response.body[0];
                return id;
            //Verify the item was created    
            })
        })
        
        //This one needs to be chained on the end
        let id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        cy.request({
            method: 'GET',
            url: `${TODO_ITEMS_PATH}/${id}`,
            headers: {accept: 'application/json'},
            failOnStatusCode: false
        }).then((result) => {
            expect(result.status).to.eq(404);
        })
        
    })

    /**
     * Create, Get, Update, Get, Delete, Get
     */

    //Anything else at this point?
})