package com.ticket.book.controller;

import com.ticket.book.entity.Ticket;
import com.ticket.book.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ticket") 
public class TicketController {

    private final TicketRepository ticketRepository;

    @Autowired
    public TicketController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // Create a new ticket
    @PostMapping("/create")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        // Save the ticket in the database
        Ticket savedTicket = ticketRepository.save(ticket);

        // Return the created ticket in the response with a 201 Created status
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTicket);
    }

    // Get all tickets
    @GetMapping("/all")
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // Search tickets by subject
    @GetMapping("/search")
    public List<Ticket> searchTicketsBySubject(@RequestParam String subject) {
        return ticketRepository.findBySubjectIgnoreCase(subject);
    }

    // Delete a ticket by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id) {
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if (ticket.isPresent()) {
            ticketRepository.deleteById(id);
            return ResponseEntity.ok("Ticket with ID " + id + " deleted");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
